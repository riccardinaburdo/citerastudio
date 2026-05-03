import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './lib/auth';

const PROTECTED = ['/area-riservata/portal', '/area-riservata/admin'];
const ADMIN_ONLY = ['/area-riservata/admin', '/api/area-riservata/project'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  if (!isProtected) return next();

  const token = context.cookies.get('ar_token')?.value;
  if (!token) return context.redirect('/area-riservata/');

  const role = await verifyToken(token);
  if (!role) {
    context.cookies.delete('ar_token', { path: '/' });
    return context.redirect('/area-riservata/');
  }

  const isAdminOnly = ADMIN_ONLY.some(p => pathname.startsWith(p));
  if (isAdminOnly && role !== 'admin') return new Response('Forbidden', { status: 403 });

  context.locals.role = role;
  return next();
});
