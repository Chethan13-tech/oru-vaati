'use client'

import React from 'react'
import { Star, Clock, MapPin, Heart, ArrowRight, Utensils } from 'lucide-react'
import { Restaurant } from '@/lib/types'

interface RestaurantCardProps {
  restaurant: Restaurant
  isSelected: boolean
  isFavorite: boolean
  onToggleFavorite: (restId: string) => void
  onSelect: (restName: string) => void
}

export function RestaurantCard({
  restaurant,
  isSelected,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: RestaurantCardProps) {
  return (
    <div
      onClick={() => onSelect(restaurant.name)}
      className={`group cursor-pointer overflow-hidden rounded-3xl border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#152520] ${
        isSelected
          ? 'border-[#e47545] ring-2 ring-[#e47545]/20 shadow-lg dark:border-[#f28b5b]'
          : 'border-[#dfe7de] hover:border-[#17342e]/30 dark:border-[#223b33] dark:hover:border-[#35594d]'
      }`}
    >
      {/* Image and Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-[#e4ede3] dark:bg-[#1f332b]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Tag Pill */}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#17342e] shadow-sm backdrop-blur dark:bg-[#152520]/95 dark:text-white">
          {restaurant.tag}
        </span>

        {/* Veg Badge if applicable */}
        {restaurant.isPureVeg && (
          <span className="absolute left-3 bottom-3 flex items-center gap-1 rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
            <span className="size-1.5 rounded-full bg-white" />
            Pure Veg
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(restaurant.id)
          }}
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full shadow-md backdrop-blur transition active:scale-90 ${
            isFavorite
              ? 'bg-[#e47545] text-white'
              : 'bg-white/90 text-[#61736a] hover:text-[#e47545] dark:bg-[#152520]/90 dark:text-[#a0b5ab]'
          }`}
          aria-label={isFavorite ? `Remove ${restaurant.name} from wishlist` : `Add ${restaurant.name} to wishlist`}
        >
          <Heart className={`size-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Time & Distance pill on bottom right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
          <Clock className="size-3 text-[#f2a884]" />
          <span>{restaurant.time}</span>
          <span>•</span>
          <span>{restaurant.distance}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#17342e] transition group-hover:text-[#e47545] dark:text-[#f4f6f5] dark:group-hover:text-[#f28b5b]">
              {restaurant.name}
            </h3>
            <p className="mt-0.5 text-xs text-[#7a8b82] dark:text-[#83978d]">
              {restaurant.area}, {restaurant.city}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 rounded-lg bg-[#f8eedf] px-2 py-1 text-xs font-bold text-[#af7026] dark:bg-[#342718] dark:text-[#f4b366]">
            <Star className="size-3.5 fill-current" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        {/* Tagline / Specialty */}
        <p className="mt-2.5 text-xs leading-5 text-[#576960] line-clamp-2 dark:text-[#9bb0a5]">
          {restaurant.tagline}
        </p>

        {/* Bottom stats & CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-[#dfe7de] pt-3 text-xs dark:border-[#223b33]">
          <span className="font-medium text-[#7a8b82] dark:text-[#83978d]">
            ₹{restaurant.priceForTwo} for two
          </span>

          <span className="flex items-center gap-1 font-bold text-[#e47545] group-hover:underline dark:text-[#f28b5b]">
            <span>View Menu</span>
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  )
}
