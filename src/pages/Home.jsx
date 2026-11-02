import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-100 px-4 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">
        Welcome to the Home page <span className="break-all text-indigo-600">{user.email}</span>
      </h1>

      <button
        type="button"
        onClick={logout}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Log out
      </button>
    </main>
  );
}
