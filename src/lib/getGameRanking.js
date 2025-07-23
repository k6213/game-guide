export async function getGameRanking({
    genreId = "",
    page = 1,
    ordering = "-rating",
    dates,
    stores,
    tags
}) {
    // ȯ�溯������ API Ű �ҷ�����
    const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=9&page=${page}`;

    if (ordering) url += `&ordering=${ordering}`;
    if (genreId) url += `&genres=${genreId}`;
    if (dates) url += `&dates=${dates}`;
    if (stores) url += `&stores=${stores}`;
    if (tags) url += `&tags=${tags}`;

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": "GameGuideWebApp" },
        });
        if (!res.ok) throw new Error("API ��û ����");
        const json = await res.json();
        return json.results;
    } catch (err) {
        console.error("���� ��ŷ �ε� ����:", err);
        return [];
    }
}
