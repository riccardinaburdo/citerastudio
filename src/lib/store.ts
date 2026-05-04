import type { ProjectData } from './schema';
import { defaultData } from './seed';

const LEGACY_KEY = 'project_v1';
const INDEX_KEY  = 'projects_index';
const pk = (id: string) => `project:${id}`;

async function getKV() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  const { kv } = await import('@vercel/kv');
  return kv;
}

async function devRead(filename: string): Promise<ProjectData | null> {
  try {
    const { readFileSync } = await import('node:fs');
    const raw = readFileSync(new URL(`../../../data/${filename}.json`, import.meta.url));
    return JSON.parse(raw.toString());
  } catch { return null; }
}

async function devWrite(filename: string, data: unknown): Promise<void> {
  const { writeFileSync, mkdirSync } = await import('node:fs');
  mkdirSync(new URL('../../../data/', import.meta.url), { recursive: true });
  writeFileSync(new URL(`../../../data/${filename}.json`, import.meta.url), JSON.stringify(data, null, 2));
}

export async function listProjects(): Promise<{ id: string; name: string }[]> {
  const db = await getKV();
  if (db) {
    try {
      const idx = await db.get<{ id: string; name: string }[]>(INDEX_KEY);
      if (idx?.length) return idx;
      // Migrate legacy single-project key
      const legacy = await db.get<ProjectData>(LEGACY_KEY);
      if (legacy) {
        const list = [{ id: 'default', name: legacy.info.name }];
        await db.set(INDEX_KEY, list);
        await db.set(pk('default'), { ...legacy, info: { ...legacy.info, id: 'default' } });
        return list;
      }
    } catch {}
  } else if (process.env.NODE_ENV !== 'production') {
    try {
      const { readFileSync } = await import('node:fs');
      const raw = readFileSync(new URL('../../../data/_index.json', import.meta.url));
      return JSON.parse(raw.toString());
    } catch {}
  }
  return [{ id: 'default', name: defaultData.info.name }];
}

export async function getProject(id = 'default'): Promise<ProjectData> {
  const db = await getKV();
  if (db) {
    try {
      const data = await db.get<ProjectData>(pk(id));
      if (data) return data;
      // Migration from legacy key for the default project
      if (id === 'default') {
        const legacy = await db.get<ProjectData>(LEGACY_KEY);
        if (legacy) return { ...legacy, info: { ...legacy.info, id: 'default' } };
      }
    } catch {}
  } else if (process.env.NODE_ENV !== 'production') {
    const d = await devRead(id);
    if (d) return d;
    if (id === 'default') {
      const leg = await devRead('project');
      if (leg) return { ...leg, info: { ...leg.info, id: 'default' } };
    }
  }
  return structuredClone({ ...defaultData, info: { ...defaultData.info, id } });
}

export async function saveProject(data: ProjectData): Promise<void> {
  const id = data.info.id || 'default';
  const db = await getKV();
  if (db) {
    await db.set(pk(id), data);
    const idx = (await db.get<{ id: string; name: string }[]>(INDEX_KEY)) ?? [];
    const entry = { id, name: data.info.name };
    const updated = idx.some(p => p.id === id)
      ? idx.map(p => p.id === id ? entry : p)
      : [...idx, entry];
    await db.set(INDEX_KEY, updated);
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    await devWrite(id, data);
    let idx: { id: string; name: string }[] = [];
    try {
      const { readFileSync } = await import('node:fs');
      idx = JSON.parse(readFileSync(new URL('../../../data/_index.json', import.meta.url)).toString());
    } catch {}
    const entry = { id, name: data.info.name };
    const updated = idx.some(p => p.id === id) ? idx.map(p => p.id === id ? entry : p) : [...idx, entry];
    await devWrite('_index', updated);
    return;
  }
  throw new Error('No storage backend configured');
}

export async function createProject(name: string): Promise<string> {
  const slug = name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const id = (slug || 'project') + '-' + Date.now().toString(36);
  await saveProject({
    info: {
      id, name, location: '', clientName: '', clientEmail: '',
      architect: '', start: '', end: '',
      updated: new Date().toISOString().slice(0, 10), updateNum: 1,
    },
    contractors: [],
    categories: [],
  });
  return id;
}
