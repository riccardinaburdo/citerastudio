export const prerender = false;
import type { APIRoute } from 'astro';
import { getProject, saveProject } from '../../../lib/store';

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id') ?? 'default';
  const data = await getProject(id);
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    await saveProject(data);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
