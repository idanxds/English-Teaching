const Progress = (function () {

  async function ensureProfile(user) {
    if (!user) return;
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username || user.email.split("@")[0],
      role: ["Carl.d.rogers@gmail.com","Englishyourway0@gmail.com"].includes(user.email)
        ? "admin"
        : "student"
    }, { onConflict: ["id"] });
  }

  async function ensureProgress(uid) {
    const { data } = await supabase.from("progress").select("*").eq("user_id", uid).maybeSingle();
    if (data) return data;

    const init = {
      user_id: uid,
      data: {
        quizzes: {},
        assignments: {},
        pages: {},
        lessons: {},
        word_game: { history: [], summary: {} },
        meta: { last_active: new Date().toISOString() }
      }
    };

    const { data: created } = await supabase.from("progress").insert(init).select().single();
    return created;
  }

  async function save(uid, patch) {
    const existing = await ensureProgress(uid);
    const merged = deep(existing.data, patch);
    const { data } = await supabase.from("progress")
      .update({ data: merged, updated_at: new Date().toISOString() })
      .eq("user_id", uid)
      .select()
      .single();
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

  return {
    ensureProfile,
    ensureProgress,
    save
  };
})();
