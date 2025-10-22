import React, { useEffect, useState } from "react";
import TopNavbar from "./components/TopNavbar";
import ArticleCard from "./components/ArticleCard";
import { fetchTopHeadlines } from "./services/newsApi";

export default function App() {
  const categories = [
    "general",
    "technology",
    "sports",
    "business",
    "science",
    "health",
    "entertainment",
  ];

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem("newsnow_bookmarks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    loadArticles(category, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    localStorage.setItem("newsnow_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  async function loadArticles(cat = "general", q = "") {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopHeadlines({ category: cat, q });
      setArticles(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }

  function toggleBookmark(article) {
    const exists = bookmarks.find((a) => a.url === article.url);
    if (exists) {
      setBookmarks((prev) => prev.filter((a) => a.url !== article.url));
    } else {
      setBookmarks((prev) => [article, ...prev]);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    loadArticles(category, query);
  }

  return (
    <div>
      <TopNavbar
        categories={categories}
        selected={category}
        onSelectCategory={setCategory}
        bookmarksCount={bookmarks.length}
        onSearchChange={setQuery}
        onSearchSubmit={handleSearch}
      />

      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">
            {category.charAt(0).toUpperCase() + category.slice(1)} News
          </h2>
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => {
                setArticles(bookmarks);
              }}
              title="Show bookmarks"
            >
              Bookmarks ({bookmarks.length})
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => loadArticles(category, "")}
              title="Refresh"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-5">
            <p>No articles found. Try a different category or search term.</p>
            <small className="text-muted">
              If you haven't set a NEWS API key, add VITE_NEWS_API_KEY to your
              .env.
            </small>
          </div>
        ) : (
          <div className="row g-3">
            {articles.map((article, idx) => (
              <div key={article.url || idx} className="col-12 col-md-6 col-lg-4">
                <ArticleCard
                  article={article}
                  isBookmarked={Boolean(
                    bookmarks.find((a) => a.url === article.url)
                  )}
                  onToggleBookmark={() => toggleBookmark(article)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="py-4 text-center text-muted">
        © {new Date().getFullYear()} NewsNow — Built with React + Vite +
        Bootstrap
      </footer>
    </div>
  );
}
