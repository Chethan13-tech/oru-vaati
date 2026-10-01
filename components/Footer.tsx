'use client'

import React from 'react'
import { Heart, Sparkles, MapPin, Rocket, ShieldCheck } from 'lucide-react'
import { CITIES } from '@/lib/data'

interface FooterProps {
  onOpenPublishGuide: () => void
  onOpenMindfulPause: () => void
  onCitySelect: (city: string) => void
}

export function Footer({
  onOpenPublishGuide,
  onOpenMindfulPause,
  onCitySelect,
}: FooterProps) {
  return (
    <footer className="border-t border-[#dfe7de] bg-[#f4f7f2] transition-colors dark:border-[#223b33] dark:bg-[#0c1714]">
      {/* Mindful Manifesto Banner */}
      <div className="border-b border-[#dfe7de] py-8 dark:border-[#223b33]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="size-2 rounded-full bg-[#e47545]" />
              <h3 className="font-serif text-xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
                The Oru Vaati Promise
              </h3>
            </div>
            <p className="mt-1 text-xs text-[#576960] dark:text-[#9bb0a5]">
              Real food from real kitchens. Zero artificial colorants. Pure cold-pressed oils. Mindful portions with honest nutrition.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMindfulPause}
              className="flex items-center gap-1.5 rounded-full border border-[#dfe7de] bg-white px-4 py-2 text-xs font-bold text-[#17342e] shadow-2xs hover:border-[#17342e] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-white"
            >
              <Sparkles className="size-3.5 text-[#e47545]" />
              <span>Mindful Pause</span>
            </button>

            <button
              onClick={onOpenPublishGuide}
              className="flex items-center gap-1.5 rounded-full bg-[#17342e] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e47545] dark:bg-[#e47545]"
            >
              <Rocket className="size-3.5" />
              <span>Publish Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-2xl bg-[#e47545] font-serif text-lg font-bold text-white shadow-sm">
                ஊ
              </div>
              <span className="font-serif text-xl font-black text-[#17342e] dark:text-white">
                Oru Vaati
              </span>
            </div>
            <p className="text-xs leading-5 text-[#576960] dark:text-[#9bb0a5]">
              A conscious food collective connecting food lovers to iconic Tamil Nadu kitchens with transparent calories and mindful reflection pauses.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#50715c] dark:text-[#8ac29f]">
              <ShieldCheck className="size-4" />
              <span>Zero-Fault Production Build</span>
            </div>
          </div>

          {/* Cities Covered */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17342e] dark:text-white">
              Cities Covered
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onCitySelect(c)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-[#576960] shadow-2xs hover:text-[#e47545] dark:bg-[#182a24] dark:text-[#a0b5ab] dark:hover:text-white"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Mindful Dining Pillars */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17342e] dark:text-white">
              Mindful Dining
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[#576960] dark:text-[#a0b5ab]">
              <li>✦ 60-Second Craving Reset</li>
              <li>✦ Complete Macro Transparency</li>
              <li>✦ Authentic Gingelly Oil & Ghee</li>
              <li>✦ Mandharai & Banana Leaf Packing</li>
              <li>✦ Zero Hidden Markups</li>
            </ul>
          </div>

          {/* Deployment & Publish Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17342e] dark:text-white">
              Website Status & Publish
            </h4>
            <p className="mt-3 text-xs leading-5 text-[#576960] dark:text-[#a0b5ab]">
              This Next.js 16 app is built for instant static or edge server deployment on Vercel, Netlify, or custom domains.
            </p>
            <button
              onClick={onOpenPublishGuide}
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-[#dfe7de] bg-white px-3.5 py-1.5 text-xs font-bold text-[#e47545] shadow-2xs hover:bg-[#fcedea] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#f28b5b]"
            >
              <span>View Deployment Guide</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-10 flex flex-col items-center justify-between border-t border-[#dfe7de] pt-6 text-xs text-[#7a8b82] sm:flex-row dark:border-[#223b33] dark:text-[#83978d]">
          <p>© {new Date().getFullYear()} Oru Vaati Inc. Built with love for Tamil Nadu culinary heritage.</p>
          <p className="mt-2 flex items-center gap-1 sm:mt-0">
            Crafted for mindful food lovers • Powered by Next.js & Turbopack
          </p>
        </div>
      </div>
    </footer>
  )
}
