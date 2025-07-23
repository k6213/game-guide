// src/lib/gemini.js (혹은 관련 js/ts 파일)

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getGeminiGuide(question) {
    const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": API_KEY,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: question }
                        ]
                    }
                ]
            }),
        }
    );

    const data = await res.json();
    console.log("Gemini 응답:", data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "응답 없음";
}

