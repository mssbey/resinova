export interface CrossSellRule {
  productId: string;
  relatedProductIds: string[];
}

export interface UpsellRule {
  id: string;
  name: string;
  targetCartAmount: number;
  suggestedProductIds: string[];
  message: string;
  priority: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}

export interface SmartSuggestionRule {
  triggerProductIds: string[];
  suggestedProductIds: string[];
  reason: string;
}

export const FREE_SHIPPING_THRESHOLD = 3000;

export const crossSellRules: CrossSellRule[] = [
  {
    productId: "pro-clear-ultra",
    relatedProductIds: ["metalik-pigment-set", "uv-resin-pro", "hobi-crystal"],
  },
  {
    productId: "deep-pour-max",
    relatedProductIds: ["pro-clear-ultra", "metalik-pigment-set"],
  },
  {
    productId: "hobi-crystal",
    relatedProductIds: ["metalik-pigment-set", "uv-resin-pro"],
  },
  {
    productId: "uv-resin-pro",
    relatedProductIds: ["hobi-crystal", "metalik-pigment-set"],
  },
  {
    productId: "metalik-pigment-set",
    relatedProductIds: ["pro-clear-ultra", "hobi-crystal", "uv-resin-pro"],
  },
];

export const upsellRules: UpsellRule[] = [
  {
    id: "upsell-freeship",
    name: "Ücretsiz Kargo Tetikleyici",
    targetCartAmount: FREE_SHIPPING_THRESHOLD,
    suggestedProductIds: ["metalik-pigment-set", "uv-resin-pro"],
    message: "Ücretsiz kargo için %AMOUNT% daha harcayın!",
    priority: 1,
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    isActive: true,
  },
  {
    id: "upsell-pro-kit",
    name: "Pro Kit Yükseltme",
    targetCartAmount: 5000,
    suggestedProductIds: ["pro-clear-ultra"],
    message: "Pro Clear Ultra ekleyerek Pro Kit'e yükseltin!",
    priority: 2,
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    isActive: true,
  },
];

export const smartSuggestionRules: SmartSuggestionRule[] = [
  {
    triggerProductIds: ["pro-clear-ultra", "deep-pour-max"],
    suggestedProductIds: ["metalik-pigment-set"],
    reason: "Pigment",
  },
  {
    triggerProductIds: ["hobi-crystal", "uv-resin-pro"],
    suggestedProductIds: ["metalik-pigment-set"],
    reason: "Renklendirici",
  },
  {
    triggerProductIds: ["pro-clear-ultra", "deep-pour-max", "hobi-crystal"],
    suggestedProductIds: ["uv-resin-pro"],
    reason: "UV Koruma",
  },
];

export const POST_PURCHASE_PRODUCTS = [
  "metalik-pigment-set",
  "uv-resin-pro",
  "hobi-crystal",
];
