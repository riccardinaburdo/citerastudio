export const prerender = false;

import type { APIRoute } from 'astro';
import { signToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form     = await request.formData();
  const password = form.get('password')?.toString() ?? '';

  const clientPass = import.meta.env.CLIENT_PASSWORD;
  const adminPass  = import.meta.env.ADMIN_PASSWORD;

  let role: 'client' | 'admin' | null = null;
  if (adminPass  && password === adminPass)  role = 'admin';
  else if (clientPass && password === clientPass) role = 'client';

  if (!role) return redirect('/area-riservata/?error=1');

  const token = await signToken(role);
  cookies.set('ar_token', token, {
    httpOnly: true,
    secure:   true,
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7,
    path:     '/',
  });

  return redirect('/area-riservata/portal');
};
