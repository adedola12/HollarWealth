import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Footer from "../components/Footer";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTag, setActiveTag] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    api
      .get("/api/blogs", { params: { limit: 50 } })
      .then((r) => setPosts(r.data?.blogs || []))
      .catch((err) =>
        setError(err.response?.data?.message || "Could not load blog posts")
      )
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeTag && !(p.tags || []).includes(activeTag)) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.excerpt,
        (p.tags || []).join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [posts, activeTag, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <main className="flex-1 max-w-[1300px] mx-auto w-full px-4 py-12">
        {/* Hero */}
        <header className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-2">
            Horlawealth Blog
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Buying guides, reviews & announcements
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Hands-on advice for getting the right machine, plus what&apos;s new
            from our team.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="flex-1 rounded-md border bg-white dark:bg-slate-900 px-4 py-2 text-sm"
          />
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag("")}
                className={`px-3 py-1 rounded-full text-xs border ${
                  !activeTag
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t === activeTag ? "" : t)}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    activeTag === t
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">Loading posts…</p>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">
            No posts match your filter.
          </p>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                className="block mb-10 rounded-xl border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition lg:grid lg:grid-cols-2"
              >
                {featured.coverImage ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-full bg-gradient-to-br from-blue-100 to-purple-100" />
                )}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
                    Featured
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-3">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {featured.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {featured.author
                      ? `${featured.author.firstName ?? ""} ${
                          featured.author.lastName ?? ""
                        }`.trim()
                      : "Horlawealth Team"}
                    {featured.publishedAt
                      ? ` · ${formatDate(featured.publishedAt)}`
                      : ""}
                  </p>
                </div>
              </Link>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((p) => (
                  <Link
                    key={p._id}
                    to={`/blog/${p.slug}`}
                    className="rounded-lg border bg-white dark:bg-slate-900 overflow-hidden hover:shadow transition flex flex-col"
                  >
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-blue-100 to-purple-100" />
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                          {p.excerpt}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-3">
                        {p.publishedAt ? formatDate(p.publishedAt) : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <footer className="mt-auto bg-white dark:bg-slate-900">
        <Footer />
      </footer>
    </div>
  );
};

export default BlogList;
