import { useState, useEffect } from "react";

export default function IBITDashboard() {
  const [score, setScore] = useState(0);

  const getStatus = (score) => {
    if (score >= 5) return "מצוין - כניסה מומלצת";
    if (score >= 3) return "טוב - כדאי לשקול כניסה";
    if (score >= 1) return "ניטרלי - המתן לאות חזק יותר";
    return "חלש - עדיף להמתין";
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sheets-as-json.akbar.dev/api/sheets/1dAeabL6x1uGpU0tb-DqVeJtUOIjzK5eT_qSUGW12mwM/Input");
        const data = await response.json();

        const row = data[0];
        let newScore = 0;
        if (parseFloat(row.priceDropPercent) >= 3) newScore += 2;
        if (row.ivHigh.toLowerCase() === "true") newScore += 2;
        if (parseInt(row.daysToExpiry) <= 2) newScore += 1;

        setScore(newScore);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-center">
      <h2 className="text-xl font-semibold mb-2">ציון כניסה לפוזיציית פוט על IBIT</h2>
      <div className="text-5xl font-bold mb-2">{score}/5</div>
      <div className="text-gray-600 mb-4">{getStatus(score)}</div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(score / 5) * 100}%` }}></div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        onClick={() => window.location.reload()}
      >
        רענן נתונים
      </button>
    </div>
  );
}
