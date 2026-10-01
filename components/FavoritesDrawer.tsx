'use client'

import React from 'react'
import { X, Heart, Plus, Trash2, ArrowRight } from 'lucide-react'
import { Dish, Restaurant } from '@/lib/types'

interface FavoritesDrawerProps {
  isOpen: boolean
  onClose: () => void
  favoriteDishes: Dish[]
  favoriteRestaurants: Restaurant[]
  onRemoveFavoriteDish: (dishId: string) => void
  onRemoveFavoriteRestaurant: (restId: string) => void
  onAddToCart: (dish: Dish) => void
  onSelectRestaurant: (restName: string) => void
}

export function FavoritesDrawer({
  isOpen,
  onClose,
  favoriteDishes,
  favoriteRestaurants,
  onRemoveFavoriteDish,
  onRemoveFavoriteRestaurant,
  onAddToCart,
  onSelectRestaurant,
}: FavoritesDrawerProps) {
  if (!isOpen) return null

  const totalFavorites = favoriteDishes.length + favoriteRestaurants.length

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col justify-between bg-[#fbfaf7] p-5 shadow-2xl dark:bg-[#152520] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#dfe7de] pb-4 dark:border-[#223b33]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
                  Saved Cravings
                </span>
                <span className="rounded-full bg-[#fceded] px-2 py-0.5 text-[10px] font-bold text-[#e47545] dark:bg-[#341d18] dark:text-[#f28b5b]">
                  {totalFavorites} saved
                </span>
              </div>
              <h2 className="mt-0.5 font-serif text-2xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
                Your Wishlist
              </h2>
            </div>

            <button
              onClick={onClose}
              className="grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-2xs hover:bg-[#e47545] hover:text-white dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="no-scrollbar my-4 flex-1 overflow-y-auto space-y-6">
          {totalFavorites === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="grid size-16 place-items-center rounded-full bg-[#fceded] text-[#e47545] dark:bg-[#341d18] dark:text-[#f28b5b]">
                <Heart className="size-8" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
                No favorites saved yet
              </h3>
              <p className="mt-1.5 max-w-xs text-xs text-[#7a8b82] dark:text-[#83978d]">
                Tap the heart on any dish or kitchen to keep your beloved cravings right here.
              </p>
            </div>
          ) : (
            <>
              {/* Favorite Dishes */}
              {favoriteDishes.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#7a8b82] dark:text-[#83978d]">
                    Saved Dishes ({favoriteDishes.length})
                  </h4>
                  <div className="space-y-3">
                    {favoriteDishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="flex items-center gap-3 rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="size-14 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="truncate text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                            {dish.name}
                          </h5>
                          <p className="text-[10px] text-[#7a8b82] dark:text-[#83978d]">
                            {dish.restaurant} • ₹{dish.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onAddToCart(dish)}
                            className="flex items-center gap-1 rounded-xl bg-[#e7f0e7] px-2.5 py-1.5 text-[11px] font-bold text-[#50715c] hover:bg-[#50715c] hover:text-white dark:bg-[#1a3328] dark:text-[#8ac29f]"
                          >
                            <Plus className="size-3" />
                            <span>Add</span>
                          </button>
                          <button
                            onClick={() => onRemoveFavoriteDish(dish.id)}
                            className="p-1.5 text-[#9bb0a5] hover:text-rose-600 transition"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorite Kitchens */}
              {favoriteRestaurants.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#7a8b82] dark:text-[#83978d]">
                    Saved Kitchens ({favoriteRestaurants.length})
                  </h4>
                  <div className="space-y-3">
                    {favoriteRestaurants.map((rest) => (
                      <div
                        key={rest.id}
                        className="flex items-center gap-3 rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]"
                      >
                        <img
                          src={rest.image}
                          alt={rest.name}
                          className="size-14 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="truncate text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                            {rest.name}
                          </h5>
                          <p className="text-[10px] text-[#7a8b82] dark:text-[#83978d]">
                            {rest.area} • ⭐ {rest.rating}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onSelectRestaurant(rest.name)
                              onClose()
                            }}
                            className="flex items-center gap-1 rounded-xl bg-[#fcedea] px-2.5 py-1.5 text-[11px] font-bold text-[#e47545] hover:bg-[#e47545] hover:text-white dark:bg-[#341d18] dark:text-[#f28b5b]"
                          >
                            <span>Menu</span>
                            <ArrowRight className="size-3" />
                          </button>
                          <button
                            onClick={() => onRemoveFavoriteRestaurant(rest.id)}
                            className="p-1.5 text-[#9bb0a5] hover:text-rose-600 transition"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#dfe7de] pt-3 text-center dark:border-[#223b33]">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-[#17342e] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#e47545] dark:bg-[#e47545]"
          >
            Back to Browsing
          </button>
        </div>
      </aside>
    </div>
  )
}
