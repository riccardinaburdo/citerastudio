export const prerender = false;
import type { APIRoute } from 'astro';
import { listProjects, createProject, deleteProject } from '../../../lib/store';

export const GET: APIRoute = async () => {
  const data = await listProjects();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name } = await request.json();
    if (!name?.trim()) {
      return new Response(JSON.stringify({ ok: false, error: 'Name required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }
    const id = await createProject(name.trim());
    return new Response(JSON.stringify({ ok: true, id }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  try {
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ ok: false, error: 'id required' }), { status: 400 });
    await deleteProject(id);
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};
