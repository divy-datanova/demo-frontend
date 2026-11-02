const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const request = async (path, { body, token } = {}) => {
  let res;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        ...(body && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body && JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
};

// POST /api/auth/login -> { token, user }
export const login = (email, password) => request("/auth/login", { body: { email, password } });

// GET /api/auth/google -> redirects to Google, then back to /auth/callback#token=... (or #error=...)
export const GOOGLE_LOGIN_URL = `${API_URL}/api/auth/google`;

// GET /api/auth/me -> { user }
export const getMe = (token) => request("/auth/me", { token });
