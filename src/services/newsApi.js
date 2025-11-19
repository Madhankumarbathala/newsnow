const BASE = "https://newsapi.org/v2";
const API_KEY = 6d54cfbb515c4dd6af0ed2de808ae991;

export async function fetchTopHeadlines({ category = "general", q = "" } = {}) {
  if (!API_KEY) {
    return demoArticles().filter(
      (a) => category === "general" || (a.category && a.category === category)
    );
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    category,
    q,
    country: "us",
    pageSize: 30,
  });

  const url = `${BASE}/top-headlines?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`News API error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.articles || [];
}

function demoArticles() {
  return [
    {
      source: { name: "Demo Times" },
      title: "Welcome to NewsNow — demo article",
      description:
        "No API key detected. Add VITE_NEWS_API_KEY to .env to fetch live news.",
      url: "https://example.com/demo-article",
      urlToImage: "",
      publishedAt: new Date().toISOString(),
      category: "general",
    },
    {
      source: { name: "Tech Demo" },
      title: "Demo: Latest in tech",
      description: "This is a placeholder tech article.",
      url: "https://example.com/tech-demo",
      urlToImage: "",
      publishedAt: new Date().toISOString(),
      category: "technology",
    },
  ];
}
