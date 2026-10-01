'use client'

import React from 'react'
import {
  MapPin,
  ShoppingBag,
  Heart,
  Clock,
  Sun,
  Moon,
  Rocket,
  Sparkles,
  Search,
} from 'lucide-react'
import { CITIES } from '@/lib/data'

interface NavbarProps {
  city: string
  onCityChange: (city: string) => void
  cartCount: number
  cartTotal: number
  favoritesCount: number
  ordersCount: number
  onOpenCart: () => void
  onOpenFavorites: () => void
  onOpenOrders: () => void
  onOpenPublishGuide: () => void
  onOpenMindfulPause: () => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Navbar({
  city,
  onCityChange,
  cartCount,
  cartTotal,
  favoritesCount,
  ordersCount,
  onOpenCart,
  onOpenFavorites,
  onOpenOrders,
  onOpenPublishGuide,
  onOpenMindfulPause,
  isDark,
  onToggleTheme,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe7de] bg-[#fbfaf7]/95 backdrop-blur-md transition-colors dark:border-[#223b33] dark:bg-[#0f1c18]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Tamil Glyph Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-center gap-3 text-left focus:outline-none"
            title="Oru Vaati — Crave Consciously"
          >
            <div className="grid size-10 place-items-center rounded-2xl bg-[#e47545] font-serif text-xl font-bold text-white shadow-md shadow-[#e47545]/25 transition-transform group-hover:scale-105">
              ஊ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-black tracking-tight text-[#17342e] dark:text-[#f4f6f5]">
                  Oru Vaati
                </span>
                <span className="rounded-md bg-[#e7f0e7] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                  Tamil Nadu
                </span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a8b82] dark:text-[#9bb0a5]">
                Crave consciously
              </p>
            </div>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#61736a] md:flex dark:text-[#a0b5ab]">
          <a
            href="#discover"
            className="transition hover:text-[#17342e] dark:hover:text-white"
          >
            Dishes
          </a>
          <a
            href="#restaurants"
            className="transition hover:text-[#17342e] dark:hover:text-white"
          >
            Kitchens
          </a>
          <button
            onClick={onOpenMindfulPause}
            className="flex items-center gap-1.5 text-[#50715c] transition hover:text-[#e47545] dark:text-[#8ac29f] dark:hover:text-[#f28b5b]"
          >
            <Sparkles className="size-3.5" />
            Mindful Pause
          </button>
          <a
            href="#reviews"
            className="transition hover:text-[#17342e] dark:hover:text-white"
          >
            Reviews
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* City Selector */}
          <div className="relative flex items-center rounded-full border border-[#dfe7de] bg-white px-2.5 py-1.5 text-xs font-bold text-[#17342e] shadow-sm transition hover:border-[#17342e] dark:border-[#2b443b] dark:bg-[#162721] dark:text-[#f4f6f5]">
            <MapPin className="size-3.5 shrink-0 text-[#e47545]" />
            <select
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              aria-label="Select Tamil Nadu city"
              className="ml-1 cursor-pointer bg-transparent pr-1 text-xs font-bold outline-none dark:bg-[#162721] dark:text-[#f4f6f5]"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="dark:bg-[#162721]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-sm transition hover:border-[#e47545] hover:text-[#e47545] dark:border-[#2b443b] dark:bg-[#162721] dark:text-[#a0b5ab] dark:hover:text-[#f28b5b]"
            title="Wishlist & Favorites"
            aria-label="Open Favorites"
          >
            <Heart className="size-4" />
            {favoritesCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#e47545] text-[9px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Past Orders Button */}
          <button
            onClick={onOpenOrders}
            className="relative grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-sm transition hover:border-[#50715c] hover:text-[#50715c] dark:border-[#2b443b] dark:bg-[#162721] dark:text-[#a0b5ab]"
            title="My Orders & Live Tracking"
            aria-label="Open Order History"
          >
            <Clock className="size-4" />
            {ordersCount > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#50715c] text-[9px] font-bold text-white">
                {ordersCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-sm transition hover:text-[#17342e] dark:border-[#2b443b] dark:bg-[#162721] dark:text-[#a0b5ab] dark:hover:text-white"
            title={isDark ? 'Switch to daylight theme' : 'Switch to night theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
          </button>

          {/* Publish / Deploy Guide Button */}
          <button
            onClick={onOpenPublishGuide}
            className="hidden items-center gap-1.5 rounded-full border border-[#d5a539]/30 bg-[#fbf6e6] px-3 py-1.5 text-xs font-bold text-[#946c14] transition hover:bg-[#faeed0] lg:flex dark:border-[#d5a539]/30 dark:bg-[#2b2512] dark:text-[#ffd875]"
            title="Deployment & Publishing instructions"
          >
            <Rocket className="size-3.5 text-[#d5a539]" />
            Publish
          </button>

          {/* Basket Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 rounded-full bg-[#17342e] px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-[#17342e]/20 transition hover:bg-[#1e443c] dark:bg-[#e47545] dark:hover:bg-[#f28b5b]"
            aria-label="Open basket"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Basket</span>
            {cartCount > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-[#e47545] text-[11px] font-black text-white dark:bg-[#17342e]">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden font-mono text-xs sm:inline">
                ₹{cartTotal}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
