import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../api";
import { useAuth } from "../context/AuthContext";

// After Google login the backend redirects here with #token=... or #error=...
export default function AuthCallback() {
  const { saveSession } = useAuth();
  const navigate = useNavigate();
  // Read the hash once: navigating away clears it, and StrictMode runs effects twice in dev
  const [params] = useState(() => new URLSearchParams(window.location.hash.slice(1)));

  useEffect(() => {
    const token = params.get("token");
    let active = true;

    // replace: true also drops the token from the address bar and history
    const fail = (error) => navigate("/login", { replace: true, state: { error } });

    if (!token) {
      fail(params.get("error") || "Google sign-in failed. Please try again.");
      return;
    }

    getMe(token)
      .then(({ user }) => {
        if (!active) return;
        saveSession({ token, user });
        navigate("/", { replace: true });
      })
      .catch((err) => active && fail(err.message));

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-500">Signing you in...</div>
  );
}
