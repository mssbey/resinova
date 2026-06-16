const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost/resinova/backend';

type RequestOptions = {
  method?: string;
  body?:   unknown;
  token?:  string;
};

async function request<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method:  opts.method ?? 'GET',
    headers,
    body:    opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'API hatası');
  return data;
}

/* ── Auth ─────────────────────────────────────── */
export const authApi = {
  register: (body: { name: string; email: string; password: string; phone?: string }) =>
    request('/api/auth/register', { method: 'POST', body }),
  login: (body: { email: string; password: string }) =>
    request('/api/auth/login', { method: 'POST', body }),
  me: (token: string) =>
    request('/api/auth/me', { token }),
  updateProfile: (body: object, token: string) =>
    request('/api/auth/me', { method: 'PUT', body, token }),
  changePassword: (body: { current_password: string; new_password: string }, token: string) =>
    request('/api/auth/change-password', { method: 'POST', body, token }),
};

/* ── Products ─────────────────────────────────── */
export const productApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/api/products${qs}`);
  },
  get: (slug: string) => request(`/api/products/${slug}`),
  create: (body: object, token: string) =>
    request('/api/products', { method: 'POST', body, token }),
  update: (id: number, body: object, token: string) =>
    request(`/api/products/${id}`, { method: 'PUT', body, token }),
  delete: (id: number, token: string) =>
    request(`/api/products/${id}`, { method: 'DELETE', token }),
};

/* ── Categories ───────────────────────────────── */
export const categoryApi = {
  list: () => request('/api/categories'),
  get:  (slug: string) => request(`/api/categories/${slug}`),
};

/* ── Cart ─────────────────────────────────────── */
export const cartApi = {
  get:    (token: string) => request('/api/cart', { token }),
  add:    (body: { product_id: number; quantity: number }, token: string) =>
    request('/api/cart', { method: 'POST', body, token }),
  update: (id: number, quantity: number, token: string) =>
    request(`/api/cart/${id}`, { method: 'PATCH', body: { quantity }, token }),
  remove: (id: number, token: string) =>
    request(`/api/cart/${id}`, { method: 'DELETE', token }),
  clear:  (token: string) => request('/api/cart', { method: 'DELETE', token }),
};

/* ── Orders ───────────────────────────────────── */
export const orderApi = {
  create: (body: object, token: string) =>
    request('/api/orders', { method: 'POST', body, token }),
  list:   (token: string) => request('/api/orders', { token }),
  get:    (id: number, token: string) => request(`/api/orders/${id}`, { token }),
  cancel: (id: number, token: string) =>
    request(`/api/orders/${id}/cancel`, { method: 'POST', token }),
};

/* ── Blog ─────────────────────────────────────── */
export const blogApi = {
  list:  (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/api/blog${qs}`);
  },
  get:   (slug: string) => request(`/api/blog/${slug}`),
};

/* ── Coupons ──────────────────────────────────── */
export const couponApi = {
  validate: (code: string, amount: number, token: string) =>
    request('/api/coupons/validate', { method: 'POST', body: { code, amount }, token }),
};

/* ── Addresses ────────────────────────────────── */
export const addressApi = {
  list:   (token: string) => request('/api/addresses', { token }),
  add:    (body: object, token: string) =>
    request('/api/addresses', { method: 'POST', body, token }),
  delete: (id: number, token: string) =>
    request(`/api/addresses/${id}`, { method: 'DELETE', token }),
};

/* ── Reviews ──────────────────────────────────── */
export const reviewApi = {
  create: (body: { product_id: number; rating: number; title?: string; body?: string; order_id?: number }, token: string) =>
    request('/api/reviews', { method: 'POST', body, token }),
};

/* ── Wholesale ────────────────────────────────── */
export const wholesaleApi = {
  apply: (body: object) =>
    request('/api/wholesale/apply', { method: 'POST', body }),
};

/* ── Returns ──────────────────────────────────── */
export const returnApi = {
  create: (body: object, token: string) =>
    request('/api/returns', { method: 'POST', body, token }),
  list:   (token: string) => request('/api/returns/mine', { token }),
};
