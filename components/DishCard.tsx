'use client'

import React from 'react'
import { Plus, Minus, Flame, Sparkles, Heart } from 'lucide-react'
import { Dish } from '@/lib/types'

interface DishCardProps {
  dish: Dish
  quantityInCart: number
  onAddToCart: (dish: Dish) => void
  onRemoveFromCart: (dishName: string) => void
  onOpenCustomize: (dish: Dish) => void
  isFavorite: boolean
  onToggleFavorite: (dishId: string) => void
}

export function DishCard({
  dish,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCustomize,
  isFavorite,
  onToggleFavorite,
}: DishCardProps) {
  // Calorie tag styling
  const calorieColor =
    dish.kcal <= 300
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
      : dish.kcal <= 500
      ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
      : 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'

  return (
    <article
      onClick={() => onOpenCustomize(dish)}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#dfe7de] bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#223b33] dark:bg-[#152520]"
    >
      {/* Top Image & Badges */}
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-[#e4ede3] dark:bg-[#1f332b]">
          <img
            src={dish.image}
            alt={dish.name}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Calorie Tag */}
          <span
            className={`absolute bottom-2.5 left-2.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur ${calorieColor}`}
          >
            {dish.kcal} kcal
          </span>

          {/* Bestseller or Light Pick */}
          {dish.isBestseller && (
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#e47545] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
              <Sparkles className="size-2.5" />
              Bestseller
            </span>
          )}

          {/* Favorite toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(dish.id)
            }}
            className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full shadow-sm backdrop-blur transition active:scale-90 ${
              isFavorite
                ? 'bg-[#e47545] text-white'
                : 'bg-white/90 text-[#61736a] hover:text-[#e47545] dark:bg-[#152520]/90 dark:text-[#a0b5ab]'
            }`}
            aria-label={isFavorite ? `Remove ${dish.name} from saved` : `Save ${dish.name}`}
          >
            <Heart className={`size-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Veg / Non-Veg and Spice Indicator */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {/* Veg / Non-Veg icon */}
              <span
                className={`grid size-4 place-items-center rounded-xs border p-0.5 ${
                  dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
                title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                />
              </span>
              <span className="text-[10px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                {dish.spiceLevel === 'Fiery' ? '🌶️🌶️ Fiery' : dish.spiceLevel === 'Medium' ? '🌶️ Spiced' : '🌱 Mild'}
              </span>
            </div>

            <span className="text-[11px] font-medium text-[#7a8b82] dark:text-[#83978d]">
              {dish.protein}g protein
            </span>
          </div>

          {/* Dish Names */}
          <div className="mt-2">
            <h4 className="font-serif text-base font-bold text-[#17342e] transition group-hover:text-[#e47545] dark:text-[#f4f6f5] dark:group-hover:text-[#f28b5b]">
              {dish.name}
            </h4>
            <p className="text-[11px] font-semibold text-[#8fa298] dark:text-[#6a8075]">
              {dish.tamilName} • {dish.restaurant}
            </p>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs leading-5 text-[#576960] line-clamp-2 dark:text-[#9bb0a5]">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Footer: Price & Add Stepper */}
      <div className="border-t border-[#dfe7de] p-4 pt-3 dark:border-[#223b33]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-black text-[#17342e] dark:text-[#f4f6f5]">
                ₹{dish.price}
              </span>
              {dish.marketPrice > dish.price && (
                <span className="text-[11px] font-medium text-[#9bb0a5] line-through">
                  ₹{dish.marketPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-[10px] text-[#7a8b82] dark:text-[#83978d]">
                {dish.portion.split(' with ')[0]}
              </p>
              {dish.marketPrice > dish.price && (
                <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Save ₹{dish.marketPrice - dish.price}
                </span>
              )}
            </div>
          </div>

          {/* Stepper or Add button */}
          {quantityInCart > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-xl bg-[#e7f0e7] p-1 shadow-inner dark:bg-[#1a3328]"
            >
              <button
                onClick={() => onRemoveFromCart(dish.name)}
                className="grid size-7 place-items-center rounded-lg bg-white text-[#17342e] shadow-2xs transition hover:bg-rose-50 hover:text-rose-600 dark:bg-[#152520] dark:text-[#f4f6f5]"
                aria-label={`Decrease ${dish.name}`}
              >
                <Minus className="size-3" />
              </button>
              <span className="w-5 text-center text-xs font-black text-[#17342e] dark:text-[#f4f6f5]">
                {quantityInCart}
              </span>
              <button
                onClick={() => onAddToCart(dish)}
                className="grid size-7 place-items-center rounded-lg bg-white text-[#17342e] shadow-2xs transition hover:bg-emerald-50 hover:text-emerald-700 dark:bg-[#152520] dark:text-[#f4f6f5]"
                aria-label={`Increase ${dish.name}`}
              >
                <Plus className="size-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(dish)
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#fceded] px-3.5 py-2 text-xs font-bold text-[#e47545] transition hover:bg-[#e47545] hover:text-white active:scale-95 dark:bg-[#341d18] dark:text-[#f28b5b] dark:hover:bg-[#e47545] dark:hover:text-white"
            >
              <Plus className="size-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
