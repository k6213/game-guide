// src/components/GuideCard.jsx
export default function GuideCard({ title, summary, game, createdAt }) {
    return (
        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-zinc-700 transition hover:shadow-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-1">{title}</h2>
            <p className="text-sm text-gray-500 mb-2">{game} · {createdAt}</p>
            <p className="text-gray-800 dark:text-gray-300 text-base line-clamp-3">{summary}</p>
        </div>
    );
}
