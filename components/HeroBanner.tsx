'use client'

import React from 'react'
import {
  Search,
  Sparkles,
  Leaf,
  ShieldCheck,
  Flame,
  ArrowRight,
  Heart,
  Timer,
  X,
} from 'lucide-react'

interface HeroBannerProps {
  search: string
  onSearchChange: (val: string) => void
  onSearchSubmit: () => void
  city: string
  onOpenMindfulPause: () => void
  onQuickCategoryClick: (cat: string) => void
}

const POPULAR_SEARCH_TAGS = [
  'Ghee Podi Idli',
  'Bun Parotta',
  'Thalappakatti Biryani',
  'Kongu Meals',
  'Jigarthanda',
  'Degree Coffee',
]

export function HeroBanner({
  search,
  onSearchChange,
  onSearchSubmit,
  city,
  onOpenMindfulPause,
  onQuickCategoryClick,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f9f4]/80 via-[#fbfaf7] to-[#fbfaf7] pb-10 pt-8 transition-colors sm:pt-14 dark:from-[#13231d]/60 dark:via-[#0f1c18] dark:to-[#0f1c18]">
      {/* Decorative subtle background blurs */}
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-[#50715c]/10 blur-3xl dark:bg-[#50715c]/5" />
      <div className="pointer-events-none absolute right-0 top-20 size-80 rounded-full bg-[#e47545]/10 blur-3xl dark:bg-[#e47545]/5" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        {/* Left Column: Heading, Search & Value Props */}
        <div>
          {/* Subheading pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dfe7de] bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#50715c] shadow-sm backdrop-blur dark:border-[#223b33] dark:bg-[#152520] dark:text-[#8ac29f]">
            <Sparkles className="size-3.5 text-[#e47545]" />
            <span>Pure regional flavours • Mindful portioning</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl font-extrabold leading-[1.05] tracking-tight text-[#17342e] sm:text-6xl dark:text-[#f4f6f5]">
            Your craving,<br />
            <span className="text-[#e47545] dark:text-[#f28b5b]">
              served mindfully.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-[#576960] sm:text-base dark:text-[#9bb0a5]">
            Authentic Tamil Nadu kitchens from {city} and beyond. Transparent calories, cold-pressed gingelly oil, and mindful pauses to help you savor every single bite.
          </p>

          {/* Search Box */}
          <div className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl border border-[#dfe7de] bg-white p-2 shadow-lg shadow-[#17342e]/5 transition focus-within:border-[#17342e] focus-within:ring-2 focus-within:ring-[#17342e]/10 dark:border-[#2b443b] dark:bg-[#162721] dark:shadow-none dark:focus-within:border-[#e47545]">
            <Search className="ml-3 size-5 text-[#8fa298] dark:text-[#6a8075]" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
              placeholder={`Search dishes, kitchens or ingredients in ${city}...`}
              className="w-full bg-transparent px-2 py-2.5 text-sm text-[#17342e] outline-none placeholder:text-[#8fa298] dark:text-[#f4f6f5] dark:placeholder:text-[#6a8075]"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="grid size-7 place-items-center rounded-full text-[#8fa298] hover:text-[#17342e] dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
            <button
              onClick={onSearchSubmit}
              className="rounded-xl bg-[#e47545] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#e47545]/20 transition hover:bg-[#d06738] active:scale-95"
            >
              Explore
            </button>
          </div>

          {/* Quick search chips */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs text-[#7a8b82] dark:text-[#83978d]">
            <span className="font-semibold">Trending:</span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSearchChange(tag)
                  onSearchSubmit()
                }}
                className="rounded-lg bg-white px-2.5 py-1 font-medium text-[#576960] shadow-2xs transition hover:bg-[#e7f0e7] hover:text-[#17342e] dark:bg-[#182a24] dark:text-[#a0b5ab] dark:hover:bg-[#203a31] dark:hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-semibold text-[#576960] dark:text-[#9bb0a5]">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-full bg-[#e7f0e7] text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                <Leaf className="size-3.5" />
              </div>
              <span>Calorie & Macro Clarity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-full bg-[#fcedea] text-[#e47545] dark:bg-[#341d18] dark:text-[#f28b5b]">
                <Flame className="size-3.5" />
              </div>
              <span>Wood-Fired & Traditional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-full bg-[#eaf1ff] text-[#3e6bb3] dark:bg-[#18283e] dark:text-[#7ba2e7]">
                <ShieldCheck className="size-3.5" />
              </div>
              <span>100% Quality Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Showcase Visual Card */}
        <div className="relative">
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-[#dfe7de] bg-white p-3 shadow-2xl shadow-[#17342e]/10 transition-all dark:border-[#223b33] dark:bg-[#152520]">
            {/* Image Container */}
            <div className="relative h-96 w-full overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1200&q=90"
                alt="South Indian traditional feast served on a fresh banana leaf"
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e211d]/90 via-[#0e211d]/30 to-transparent" />

              {/* Top floating pill */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#17342e] shadow-md backdrop-blur dark:bg-[#152520]/90 dark:text-white">
                <span className="size-2 animate-ping rounded-full bg-[#e47545]" />
                Live in {city} • Fresh Kitchens
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-[#f2a884]">
                  Culinary Heritage
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                  A Taste of Tamil Nadu
                </h3>
                <p className="mt-1.5 text-xs text-white/80 line-clamp-2">
                  From fragrant Mylapore podi idlis to wood-fired Dindigul biryani and chilled royal Madurai Jigarthanda.
                </p>

                {/* Action buttons inside card */}
                <div className="mt-4 flex items-center justify-between gap-3 pt-2 border-t border-white/15">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                    <Timer className="size-4 text-[#f28b5b]" />
                    <span>Average 22 mins</span>
                  </div>

                  <button
                    onClick={onOpenMindfulPause}
                    className="flex items-center gap-1.5 rounded-full bg-[#e47545] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#e47545]/30 transition hover:bg-[#d06738] active:scale-95"
                  >
                    <span>Mindful Pause</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
