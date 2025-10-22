import React from "react";

export default function TopNavbar({
  categories,
  selected,
  onSelectCategory,
  bookmarksCount,
  onSearchChange,
  onSearchSubmit,
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">
          NewsNow
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((cat) => (
              <li className="nav-item" key={cat}>
                <button
                  className={`nav-link btn btn-link ${
                    selected === cat ? "active text-white" : "text-light"
                  }`}
                  onClick={() => onSelectCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit(e);
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search articles"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn btn-light" type="submit">
              Search
            </button>
          </form>

          <div className="ms-3 text-white d-flex align-items-center">
            <i className="bi bi-bookmark-fill me-1"></i>
            <small>Bookmarks: {bookmarksCount}</small>
          </div>
        </div>
      </div>
    </nav>
  );
}
