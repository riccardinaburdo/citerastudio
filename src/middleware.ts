import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (!pathname.startsWith('/area-riservata/portal')) return next();

  const token = context.cookies.get('ar_token')?.value;
  if (!token) return context.redirect('/area-riservata/');

  const role = await verifyToken(token);
  if (!role) {
    context.cookies.delete('ar_token', { path: '/' });
    return context.redirect('/area-riservata/');
  }

  context.locals.role = role;
  return next();
});
