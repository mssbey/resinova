import { products } from "@/data/products";
import {
  crossSellRules,
  upsellRules,
  smartSuggestionRules,
  FREE_SHIPPING_THRESHOLD,
  UpsellRule,
} from "@/data/recommendations";

export function getRelatedProducts(productId: string, limit = 4) {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  const ruleIds =
    crossSellRules.find((r) => r.productId === productId)?.relatedProductIds ??
    product.relatedProducts ??
    [];

  const related = ruleIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (related.length < limit) {
    const extras = products
      .filter(
        (p) =>
          p.id !== productId &&
          !ruleIds.includes(p.id) &&
          p.category === product.category
      )
      .slice(0, limit - related.length);
    related.push(...extras);
  }

  return related.slice(0, limit);
}

export function getUpsellBar(cartTotal: number): {
  rule: UpsellRule;
  remaining: number;
  message: string;
} | null {
  const now = new Date();

  const active = upsellRules
    .filter(
      (r) =>
        r.isActive &&
        cartTotal < r.targetCartAmount &&
        new Date(r.startsAt) <= now &&
        new Date(r.endsAt) >= now
    )
    .sort((a, b) => a.priority - b.priority);

  if (!active.length) return null;

  const rule = active[0];
  const remaining = rule.targetCartAmount - cartTotal;
  const message = rule.message.replace(
    "%AMOUNT%",
    `₺${remaining.toLocaleString("tr-TR")}`
  );

  return { rule, remaining, message };
}

export function getSmartSuggestions(cartProductIds: string[], limit = 4) {
  const suggested = new Set<string>();

  for (const rule of smartSuggestionRules) {
    const triggered = rule.triggerProductIds.some((id) =>
      cartProductIds.includes(id)
    );
    if (triggered) {
      rule.suggestedProductIds.forEach((id) => {
        if (!cartProductIds.includes(id)) suggested.add(id);
      });
    }
  }

  if (suggested.size === 0) {
    products
      .filter((p) => !cartProductIds.includes(p.id))
      .slice(0, limit)
      .forEach((p) => suggested.add(p.id));
  }

  return [...suggested]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, limit);
}

export function getFreeShippingProgress(cartTotal: number): {
  progress: number;
  remaining: number;
  achieved: boolean;
} {
  const achieved = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  return { progress, remaining, achieved };
}
