import supabase from "../supabaseClient";

const SESSION_KEY = "supabase_session";

export const saveSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
};

export const loadSession = async () => {
  const savedSession = localStorage.getItem(SESSION_KEY);
  if (savedSession) {
    const session = JSON.parse(savedSession);
    await supabase.auth.setSession(session);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id || null;
  }
  return null;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
