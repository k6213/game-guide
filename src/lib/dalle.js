// src/lib/dalle.js

// ȯ�溯������ API Ű �ҷ�����
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateImage(prompt) {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "512x512", // �Ǵ� 1024x1024
        }),
    });

    const data = await res.json();
    return data?.data?.[0]?.url ?? "";
}

