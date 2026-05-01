export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('ar_token', { path: '/' });
  return redirect('/area-riservata/');
};
