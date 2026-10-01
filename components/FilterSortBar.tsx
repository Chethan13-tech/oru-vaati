'use client'

import React from 'react'
import { Filter, RotateCcw, ArrowUpDown, Flame, Leaf } from 'lucide-react'

export type CalorieFilter = 'all' | 'under300' | '300to500' | 'over500'
export type SortOption = 'recommended' | 'rating' | 'priceLow' | 'priceHigh' | 'caloriesLow'

interface FilterSortBarProps {
  vegOnly: boolean
  onToggleVegOnly: () => void
  calorieFilter: CalorieFilter
  onSelectCalorieFilter: (filter: CalorieFilter) => void
  sortBy: SortOption
  onSelectSortBy: (sort: SortOption) => void
  totalCount: number
  onResetFilters: () => void
  hasActiveFilters: boolean
}

export function FilterSortBar({
  vegOnly,
  onToggleVegOnly,
  calorieFilter,
  onSelectCalorieFilter,
  sortBy,
  onSelectSortBy,
  totalCount,
  onResetFilters,
  hasActiveFilters,
}: FilterSortBarProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#152520]">
        {/* Left: Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pure Veg Toggle */}
          <button
            onClick={onToggleVegOnly}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
              vegOnly
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'border-[#dfe7de] bg-white text-[#576960] hover:border-emerald-500 dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]'
            }`}
          >
            <span
              className={`size-2.5 rounded-xs border-2 ${
                vegOnly
                  ? 'border-emerald-600 bg-emerald-600 dark:border-emerald-400 dark:bg-emerald-400'
                  : 'border-emerald-600'
              }`}
            />
            <span>Pure Veg</span>
          </button>

          {/* Calorie Filter Dropdown */}
          <div className="relative flex items-center rounded-full border border-[#dfe7de] bg-white px-3 py-1.5 text-xs font-bold text-[#576960] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]">
            <Flame className="mr-1.5 size-3.5 text-[#e47545]" />
            <select
              value={calorieFilter}
              onChange={(e) => onSelectCalorieFilter(e.target.value as CalorieFilter)}
              aria-label="Filter by Calorie Budget"
              className="cursor-pointer bg-transparent text-xs font-bold text-[#17342e] outline-none dark:bg-[#182a24] dark:text-[#f4f6f5]"
            >
              <option value="all" className="dark:bg-[#182a24]">All Calories</option>
              <option value="under300" className="dark:bg-[#182a24]">Light &lt; 300 kcal</option>
              <option value="300to500" className="dark:bg-[#182a24]">Balanced 300–500 kcal</option>
              <option value="over500" className="dark:bg-[#182a24]">Hearty &gt; 500 kcal</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 rounded-full bg-[#fcedea] px-3 py-1.5 text-xs font-bold text-[#e47545] transition hover:bg-[#fad8d1] dark:bg-[#341d18] dark:text-[#f28b5b]"
              title="Reset all active filters"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Sort and Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#7a8b82] dark:text-[#83978d]">
            Showing <strong className="text-[#17342e] dark:text-[#f4f6f5]">{totalCount}</strong> items
          </span>

          <div className="flex items-center rounded-full border border-[#dfe7de] bg-white px-3 py-1.5 text-xs font-bold text-[#576960] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]">
            <ArrowUpDown className="mr-1.5 size-3.5 text-[#50715c] dark:text-[#8ac29f]" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value as SortOption)}
              aria-label="Sort dishes"
              className="cursor-pointer bg-transparent text-xs font-bold text-[#17342e] outline-none dark:bg-[#182a24] dark:text-[#f4f6f5]"
            >
              <option value="recommended" className="dark:bg-[#182a24]">Recommended</option>
              <option value="rating" className="dark:bg-[#182a24]">Highest Rated</option>
              <option value="priceLow" className="dark:bg-[#182a24]">Price: Low to High</option>
              <option value="priceHigh" className="dark:bg-[#182a24]">Price: High to Low</option>
              <option value="caloriesLow" className="dark:bg-[#182a24]">Lowest Calories</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
