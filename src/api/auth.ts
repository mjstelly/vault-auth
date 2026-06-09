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
  return res.json() as Promise<AuthUser>;
}

export async function getMe(
  token: string,
): Promise<Omit<AuthUser, 'accessToken' | 'refreshToken'>> {
  const res = await fetch('https://dummyjson.com/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  await throwOnError(res);
  return res.json() as Promise<Omit<AuthUser, 'accessToken' | 'refreshToken'>>;
}
