export type LoginCredentials = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthError = {
  message: string;
};

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
};

export type SignupResult = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

async function throwOnError(res: Response): Promise<void> {
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as Partial<AuthError>;
    throw new Error(body.message ?? `Request failed with status ${res.status}`);
  }
}

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  await throwOnError(res);
  // res.json() returns Promise<any>; cast is safe at this API boundary where shape is known
  return res.json() as Promise<AuthUser>;
}

export async function getMe(
  token: string,
): Promise<Omit<AuthUser, 'accessToken' | 'refreshToken'>> {
  const res = await fetch('https://dummyjson.com/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  await throwOnError(res);
  // res.json() returns Promise<any>; cast is safe at this API boundary where shape is known
  return res.json() as Promise<Omit<AuthUser, 'accessToken' | 'refreshToken'>>;
}

export async function getProducts(token: string): Promise<ProductsResponse> {
  const res = await fetch('https://dummyjson.com/auth/products?limit=6', {
    headers: { Authorization: `Bearer ${token}` },
  });
  await throwOnError(res);
  // res.json() returns Promise<any>; cast is safe at this API boundary where shape is known
  return res.json() as Promise<ProductsResponse>;
}

export async function signupUser(payload: SignupPayload): Promise<SignupResult> {
  const res = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  await throwOnError(res);
  // res.json() returns Promise<any>; cast is safe at this API boundary where shape is known
  return res.json() as Promise<SignupResult>;
}
