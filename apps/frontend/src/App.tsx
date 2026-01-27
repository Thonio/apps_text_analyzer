import { useEffect, useState } from "react";
import { z } from "zod";

const analyzeSchema = z.object({
  text: z
    .string()
    .min(1, "Le texte ne peut pas être vide")
    .max(5000, "Le texte est trop long"),
});
const API_BASE_URL = "http://localhost:3000/api";

type ResponseApi = {
  status: string,
  score: number
}
type Historytype = { id: number; text: string; score: number; status: string }

export default function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseApi | null>(null);
  const [history, setHistory] = useState<Historytype[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAnalyze = async () => {
    const validation = analyzeSchema.safeParse({ text });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setError(null);
    setApiError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "Erreur serveur lors de l'analyse"
        );
      }

      const data = await response.json();
      setResult(data)

      await fetchHistory();
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Erreur inconnue lors de l'appel API"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);

      if (!response.ok) {
        throw new Error("Impossible de charger l'historique");
      }

      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement de l'historique"
      );
    }
  };
  const handleSelectHistory = (item: Historytype) => {
    setSelectedId(item.id);
    setText(item.text);
    setResult({
      status: item.status,
      score: item.score
    });
    setError(null);
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Analyse de texte
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-4 shadow">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Texte à analyser
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-40 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Colle ton texte ici…"
              />

              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}

              {apiError && (
                <p className="mt-2 text-sm text-red-600">{apiError}</p>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyse en cours…" : "Analyze"}
              </button>
            </div>

            {/* Résultat */}
            <div className="rounded-2xl bg-white p-4 shadow">
              <h2 className="mb-2 text-lg font-medium text-gray-800">Résultat</h2>
              {result ? (
                <pre className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                  Status: {result.status} - score: {result.score}
                </pre>
              ) : (
                <p className="text-sm text-gray-500">Aucun résultat</p>
              )}
            </div>
          </div>

          {/* Sidebar historique */}
          <aside className="rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-4 text-lg font-medium text-gray-800">
              Historique
            </h2>

            <ul className="space-y-3">
              {history.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectHistory(item)}
                  className="cursor-pointer rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <p className="mb-1 text-xs text-gray-500">
                    {item.text.slice(0, 60)}
                    {item.text.length > 60 && "…"}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Analyse: {item.status} - {item.score} points
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
