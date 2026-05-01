const getKey = async () =>
  crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(import.meta.env.AUTH_SECRET ?? 'dev-secret-please-set-env'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );

export async function signToken(role: string): Promise<string> {
  const key  = await getKey();
  const sig  = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(role));
  const hex  = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${role}:${hex}`;
}

export async function verifyToken(token: string): Promise<'client' | 'admin' | null> {
  const sep = token.indexOf(':');
  if (sep === -1) return null;
  const role = token.substring(0, sep);
  if (role !== 'client' && role !== 'admin') return null;
  const expected = await signToken(role);
  return token === expected ? role : null;
}
