'use client'

import React from 'react'
import { CATEGORIES } from '@/lib/data'
import { Category } from '@/lib/types'

interface CategoryTabsProps {
  activeCategory: Category
  onSelectCategory: (category: Category) => void
  dishCountsByCategory: Record<Category, number>
}

export function CategoryTabs({
  activeCategory,
  onSelectCategory,
  dishCountsByCategory,
}: CategoryTabsProps) {
  return (
    <section id="discover" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
            Explore By Mood & Tradition
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#17342e] sm:text-3xl dark:text-[#f4f6f5]">
            What are you craving right now?
          </h2>
        </div>
        <p className="text-xs font-medium text-[#7a8b82] dark:text-[#9bb0a5]">
          Handcrafted regional favorites
        </p>
      </div>

      {/* Scrollable pill container */}
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-2 pt-1">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.label
          const count = dishCountsByCategory[category.label] ?? 0

          return (
            <button
              key={category.label}
              onClick={() => onSelectCategory(category.label)}
              className={`group flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                isActive
                  ? 'border-[#17342e] bg-[#17342e] text-white shadow-md shadow-[#17342e]/15 dark:border-[#e47545] dark:bg-[#e47545]'
                  : 'border-[#dfe7de] bg-white text-[#576960] hover:border-[#17342e]/40 hover:text-[#17342e] dark:border-[#2b443b] dark:bg-[#162721] dark:text-[#a0b5ab] dark:hover:text-white'
              }`}
            >
              <span className={`text-base ${isActive ? 'text-[#f2a884]' : 'text-[#8fa298] group-hover:text-[#17342e]'}`}>
                {category.icon}
              </span>
              <span>{category.label}</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#f0f4ef] text-[#7a8b82] dark:bg-[#20342c] dark:text-[#83978d]'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
