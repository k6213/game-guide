const API_KEY = "AIzaSyBY9blAjPWbURgIIhF7laQR7aBb066hURQ"; // 실제 키로 교체

export async function getGeminiGuide(question) {
    const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": API_KEY, // 🔥 중요: 쿼리 문자열이 아님
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

