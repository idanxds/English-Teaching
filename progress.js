// progress.js - progress helpers
const Progress = (function () {
  async function ensureProfile(user) {
    if (!user) return;
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username || user.email.split("@")[0],
      role: ["Carl.d.rogers@gmail.com","Englishyourway0@gmail.com"].includes(user.email) ? "admin" : "student"
    }, { onConflict: ["id"] });
  }
  async function ensureProgress(uid) {
    const { data } = await supabase.from("progress").select("*").eq("user_id", uid).maybeSingle();
    if (data) return data;
    const init = { user_id: uid, data: { quizzes: {}, assignments: {}, pages: {}, lessons: {}, word_game: { history: [], summary: {} }, meta: { last_active: new Date().toISOString() } } };
    const { data: created } = await supabase.from("progress").insert(init).select().single();
    return created;
  }
  async function save(uid, patch) {
    const existing = await ensureProgress(uid);
    const merged = deep(existing.data, patch);
    const { data } = await supabase.from("progress").update({ data: merged, updated_at: new Date().toISOString() }).eq("user_id", uid).select().single();
    return data;
  }
  function deep(a, b) {
    if (typeof a !== "object" || a === null) return b;
    const o = Array.isArray(a) ? [...a] : { ...a };
    for (const k in b) {
      if (typeof b[k] === "object" && b[k] !== null && k in o) o[k] = deep(o[k], b[k]);
      else o[k] = b[k];
    }
    return o;
  }
  async function listAllProgress() {
    const { data, error } = await supabase.from('progress').select('*, profiles ( username, role, email )').order('updated_at', { ascending: false });
    if (error) { console.error('listAllProgress', error); return []; }
    return data;
  }
  async function getUserProgressById(uid) { const { data, error } = await supabase.from('progress').select('*').eq('user_id', uid).single().maybeSingle(); if (error) console.error('getUserProgressById', error); return data; }
  async function resetUserProgress(uid) { const { data, error } = await supabase.from('progress').update({ data: {} }).eq('user_id', uid).select().single(); if (error) console.error('resetUserProgress', error); return data; }
  async function exportAllProgressCSV() {
    const all = await listAllProgress();
    const rows = []; rows.push(['email','username','joined','last_active','progress_json']);
    for(const r of all){ const email = r.profiles?.email || '(no-email)'; const username = r.profiles?.username || '-'; rows.push([email, username, r.created_at || '', r.updated_at || '', JSON.stringify(r.data || {})]); }
    return rows.map(r => r.map(cell => `"${String(cell||'').replace(/"/g,'""')}"`).join(',')).join('\n');
  }
  async function getEmailForUserId(uid) { const { data, error } = await supabase.from('profiles').select('email').eq('id', uid).limit(1).single().maybeSingle(); if (error) return '(error)'; return data?.email || '(no-email)'; }
  return { ensureProfile, ensureProgress, save, listAllProgress, getUserProgressById, resetUserProgress, exportAllProgressCSV, getEmailForUserId };
})();
