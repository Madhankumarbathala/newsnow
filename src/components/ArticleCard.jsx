import React from "react";

export default function ArticleCard({ article, isBookmarked, onToggleBookmark }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  const time = publishedAt ? new Date(publishedAt).toLocaleString() : "";

  return (
    <div className="card h-100 shadow-sm">
      {urlToImage ? (
        <img
          src={urlToImage}
          className="card-img-top"
          alt={title}
          style={{ maxHeight: 180, objectFit: "cover" }}
        />
      ) : (
        <div
          className="card-img-top placeholder-img d-flex align-items-center justify-content-center"
          style={{ height: 180 }}
        >
          <span>No image</span>
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text" style={{ flexGrow: 1 }}>
          {description || "No description available."}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <small className="text-muted">{source?.name || "Source"}</small>
            <br />
            <small className="text-muted">{time}</small>
          </div>

          <div className="btn-group">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read
            </a>
            <button
              className={`btn btn-sm ${
                isBookmarked ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={onToggleBookmark}
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
