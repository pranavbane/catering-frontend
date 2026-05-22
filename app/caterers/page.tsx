"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Caterer } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const MAX_PRICE = 2000;

// ── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "rating-star" : "opacity-20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs font-medium text-amber-300">{rating.toFixed(1)}</span>
    </div>
  );
}

// ── Caterer Card ─────────────────────────────────────────────────────────────
function CatererCard({ caterer, index }: { caterer: Caterer; index: number }) {
  return (
    <div
      className="card-hover animate-fade-up rounded-2xl p-6 flex flex-col gap-4 border"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(245,166,35,0.15)",
        backdropFilter: "blur(12px)",
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
        opacity: 0,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className="font-display text-lg font-semibold leading-tight truncate"
            style={{ color: "#f5ede0" }}
          >
            {caterer.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <svg className="w-3.5 h-3.5 opacity-60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs opacity-60 truncate">{caterer.location}</span>
          </div>
        </div>

        {/* Price badge */}
        <div
          className="shrink-0 rounded-xl px-3 py-2 text-center"
          style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)" }}
        >
          <p className="text-xs opacity-60 leading-none mb-0.5">per plate</p>
          <p className="font-display font-bold text-lg leading-none" style={{ color: "#f5a623" }}>
            ₹{caterer.pricePerPlate.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={caterer.rating} />

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(245,166,35,0.08)" }} />

      {/* Cuisines */}
      <div className="flex flex-wrap gap-1.5">
        {caterer.cuisines.map((cuisine) => (
          <span
            key={cuisine}
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: "rgba(245,166,35,0.08)",
              border: "1px solid rgba(245,166,35,0.18)",
              color: "#f5d58a",
            }}
          >
            {cuisine}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,166,35,0.08)" }}
    >
      <div className="flex justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 rounded-lg w-3/4" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="h-3 rounded-lg w-1/2" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>
        <div className="w-16 h-12 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
        ))}
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CaterersPage() {
  let cateresData = [
  {
    "id": "c001",
    "name": "Spice Route Caterers",
    "location": "Andheri, Mumbai",
    "pricePerPlate": 450,
    "cuisines": ["North Indian", "Mughlai", "Punjabi"],
    "rating": 4.7
  },
  {
    "id": "c002",
    "name": "The Grand Feast",
    "location": "Bandra, Mumbai",
    "pricePerPlate": 850,
    "cuisines": ["Continental", "Italian", "Mediterranean"],
    "rating": 4.9
  },
  {
    "id": "c003",
    "name": "Desi Tadka Events",
    "location": "Thane West",
    "pricePerPlate": 350,
    "cuisines": ["South Indian", "Maharashtra", "Street Food"],
    "rating": 4.3
  },
  {
    "id": "c004",
    "name": "Royal Kitchen Co.",
    "location": "Powai, Mumbai",
    "pricePerPlate": 1200,
    "cuisines": ["Rajasthani", "Gujarati", "Jain"],
    "rating": 4.8
  },
  {
    "id": "c005",
    "name": "Savor & Serve",
    "location": "Navi Mumbai",
    "pricePerPlate": 600,
    "cuisines": ["Chinese", "Thai", "Pan-Asian"],
    "rating": 4.5
  },
  {
    "id": "c006",
    "name": "Coastal Bites Catering",
    "location": "Juhu, Mumbai",
    "pricePerPlate": 750,
    "cuisines": ["Seafood", "Goan", "Coastal Indian"],
    "rating": 4.6
  },
  {
    "id": "c007",
    "name": "Mithas Banquets",
    "location": "Mulund, Mumbai",
    "pricePerPlate": 400,
    "cuisines": ["North Indian", "Sweets & Desserts", "Chaat"],
    "rating": 4.2
  },
  {
    "id": "c008",
    "name": "Silver Platter Events",
    "location": "Vashi, Navi Mumbai",
    "pricePerPlate": 950,
    "cuisines": ["Lebanese", "Mexican", "Fusion"],
    "rating": 4.7
  },
  {
    "id": "c009",
    "name": "Flavors of India",
    "location": "Dadar, Mumbai",
    "pricePerPlate": 300,
    "cuisines": ["South Indian", "North Indian", "Biryani"],
    "rating": 4.1
  },
  {
    "id": "c010",
    "name": "Elite Catering Services",
    "location": "Lower Parel, Mumbai",
    "pricePerPlate": 1500,
    "cuisines": ["European", "Japanese", "Fine Dining"],
    "rating": 5.0
  }
]

  const [caterers, setCaterers] = useState<Caterer[]>(cateresData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = useCallback((val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 350);
  }, []);

  // Fetch caterers
  useEffect(() => {
    const fetchCaterers = async () => {
      setLoading(true);
      setError(null);
      try {
        // const params = new URLSearchParams();
        // if (debouncedSearch) params.set("name", debouncedSearch);
        // if (maxPrice < MAX_PRICE) params.set("maxPrice", String(maxPrice));

        // const res = await fetch(`${API_URL}/api/caterers?${params.toString()}`);
        // if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // const json = await res.json();
        setCaterers(cateresData);
      } catch (err) {
        setError("Unable to reach the API. Make sure the backend is running on port 5000.");
        setCaterers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaterers();
  }, [debouncedSearch, maxPrice]);

  // Update range track fill
  const rangePercent = ((maxPrice / MAX_PRICE) * 100).toFixed(0);

  return (
    <main className="relative z-10 min-h-screen">
      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <header className="pt-16 pb-12 px-4 text-center relative overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,166,35,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)", color: "#f5a623" }}>
            <span>🍽️</span>
            <span>Find your perfect caterer</span>
          </div>

          <h1
            className="font-display font-black leading-none mb-4"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              background: "linear-gradient(135deg, #f5ede0 0%, #f5a623 50%, #f5ede0 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}
          >
            CaterQuest
          </h1>
          <p className="text-base opacity-60 font-light">
            Discover top catering services crafted for every occasion
          </p>
        </div>
      </header>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-8 max-w-6xl mx-auto">
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-end"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(245,166,35,0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium mb-2 opacity-60 uppercase tracking-widest">
              Search by name
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="e.g. Spice Route, Royal Kitchen…"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(245,166,35,0.2)",
                  color: "#f5ede0",
                  caretColor: "#f5a623",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,166,35,0.6)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(245,166,35,0.2)"; }}
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Price filter */}
          <div className="w-full sm:w-72">
            <label className="flex items-center justify-between text-xs font-medium mb-2 opacity-60 uppercase tracking-widest">
              <span>Max price per plate</span>
              <span style={{ color: "#f5a623" }} className="font-bold opacity-100">
                {maxPrice === MAX_PRICE ? "Any" : `₹${maxPrice.toLocaleString("en-IN")}`}
              </span>
            </label>
            <input
              type="range"
              min={100}
              max={MAX_PRICE}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ "--val": `${rangePercent}%` } as React.CSSProperties}
            />
            <div className="flex justify-between text-xs opacity-30 mt-1">
              <span>₹100</span>
              <span>₹{MAX_PRICE.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Reset */}
          {(searchQuery || maxPrice < MAX_PRICE) && (
            <button
              onClick={() => { handleSearchChange(""); setMaxPrice(MAX_PRICE); }}
              className="shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", color: "#f5a623" }}
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 max-w-6xl mx-auto">
        {/* Count */}
        {!loading && !error && (
          <p className="text-xs opacity-40 mb-5 font-medium uppercase tracking-widest">
            {caterers.length} {caterers.length === 1 ? "caterer" : "caterers"} found
          </p>
        )}

        {/* Error */}
        {error && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(220,50,50,0.06)", border: "1px solid rgba(220,50,50,0.2)" }}
          >
            <div className="text-3xl mb-3">⚠️</div>
            <p className="font-medium text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : caterers.map((caterer, index) => (
                <CatererCard key={caterer.id} caterer={caterer} index={index} />
              ))}
        </div>

        {/* Empty state */}
        {!loading && !error && caterers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-semibold mb-2">No caterers found</h3>
            <p className="text-sm opacity-50">Try adjusting your search or price filter</p>
          </div>
        )}
      </section>
    </main>
  );
}
