import type { ProjectData } from './schema';
import { defaultData } from './seed';

const KV_KEY = 'project_v1';

export async function getProject(): Promise<ProjectData> {
  // Try Vercel KV
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import('@vercel/kv');
      const data = await kv.get<ProjectData>(KV_KEY);
      if (data) return data;
    } catch {}
  }
  // Dev fallback: read from data/project.json
  if (process.env.NODE_ENV !== 'production') {
    try {
      const { readFileSync } = await import('node:fs');
      const raw = readFileSync(new URL('../../../data/project.json', import.meta.url));
      return JSON.parse(raw.toString());
    } catch {}
  }
  return structuredClone(defaultData);
}

export async function saveProject(data: ProjectData): Promise<void> {
  // Try Vercel KV
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import('@vercel/kv');
    await kv.set(KV_KEY, data);
    return;
  }
  // Dev fallback: write to data/project.json
  if (process.env.NODE_ENV !== 'production') {
    const { writeFileSync, mkdirSync } = await import('node:fs');
    const path = new URL('../../../data/project.json', import.meta.url);
    mkdirSync(new URL('../../../data/', import.meta.url), { recursive: true });
    writeFileSync(path, JSON.stringify(data, null, 2));
    return;
  }
  throw new Error('No storage backend configured');
}
