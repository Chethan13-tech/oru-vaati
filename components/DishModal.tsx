'use client'

import React, { useState } from 'react'
import { X, Plus, Check, Flame, Sparkles, Heart } from 'lucide-react'
import { Dish, DishAddon, SpiceLevel } from '@/lib/types'

interface DishModalProps {
  dish: Dish | null
  onClose: () => void
  onAddToCartCustom: (
    dish: Dish,
    spice: SpiceLevel,
    addons: DishAddon[],
    notes: string,
    quantity: number
  ) => void
  isFavorite: boolean
  onToggleFavorite: (dishId: string) => void
}

export function DishModal({
  dish,
  onClose,
  onAddToCartCustom,
  isFavorite,
  onToggleFavorite,
}: DishModalProps) {
  if (!dish) return null

  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(dish.spiceLevel)
  const [selectedAddons, setSelectedAddons] = useState<DishAddon[]>([])
  const [specialNotes, setSpecialNotes] = useState('')
  const [quantity, setQuantity] = useState(1)

  const toggleAddon = (addon: DishAddon) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name))
    } else {
      setSelectedAddons([...selectedAddons, addon])
    }
  }

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0)
  const itemUnitPrice = dish.price + addonsTotal
  const finalPrice = itemUnitPrice * quantity

  const handleAdd = () => {
    onAddToCartCustom(dish, selectedSpice, selectedAddons, specialNotes, quantity)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-[#dfe7de] bg-[#fbfaf7] p-6 shadow-2xl dark:border-[#223b33] dark:bg-[#152520] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-[#61736a] shadow-sm backdrop-blur transition hover:bg-[#e47545] hover:text-white dark:bg-[#1e332a] dark:text-[#a0b5ab]"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>

        {/* Dish Hero Image */}
        <div className="relative -mx-6 -mt-6 mb-5 h-56 overflow-hidden rounded-t-[2rem] sm:-mx-8 sm:-mt-8">
          <img
            src={dish.image}
            alt={dish.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(dish.id)}
            className={`absolute left-5 top-5 grid size-9 place-items-center rounded-full shadow-md backdrop-blur transition active:scale-90 ${
              isFavorite
                ? 'bg-[#e47545] text-white'
                : 'bg-white/90 text-[#61736a] hover:text-[#e47545] dark:bg-[#152520]/90 dark:text-[#a0b5ab]'
            }`}
          >
            <Heart className={`size-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Bottom title inside image */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
              {dish.restaurant}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-bold">{dish.name}</h3>
            <p className="text-xs font-semibold text-white/80">{dish.tamilName}</p>
          </div>
        </div>

        {/* Nutritional Information Grid */}
        <div className="mb-6 rounded-2xl border border-[#dfe7de] bg-white p-4 dark:border-[#223b33] dark:bg-[#182a24]">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#7a8b82] dark:text-[#83978d]">
            Conscious Nutrition Breakdown
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-xl bg-[#f5f9f4] p-2 dark:bg-[#1f352c]">
              <span className="block text-base font-black text-[#50715c] dark:text-[#8ac29f]">
                {dish.kcal}
              </span>
              <span className="text-[10px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Calories
              </span>
            </div>
            <div className="rounded-xl bg-[#f5f9f4] p-2 dark:bg-[#1f352c]">
              <span className="block text-base font-black text-[#17342e] dark:text-[#f4f6f5]">
                {dish.protein}g
              </span>
              <span className="text-[10px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Protein
              </span>
            </div>
            <div className="rounded-xl bg-[#f5f9f4] p-2 dark:bg-[#1f352c]">
              <span className="block text-base font-black text-[#17342e] dark:text-[#f4f6f5]">
                {dish.carbs}g
              </span>
              <span className="text-[10px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Carbs
              </span>
            </div>
            <div className="rounded-xl bg-[#f5f9f4] p-2 dark:bg-[#1f352c]">
              <span className="block text-base font-black text-[#17342e] dark:text-[#f4f6f5]">
                {dish.fat}g
              </span>
              <span className="text-[10px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Fats
              </span>
            </div>
          </div>
        </div>

        {/* Description & Portion */}
        <div className="mb-6">
          <p className="text-xs leading-6 text-[#576960] dark:text-[#a0b5ab]">
            {dish.description}
          </p>
          <p className="mt-2 text-xs font-semibold text-[#7a8b82] dark:text-[#83978d]">
            Portion: {dish.portion}
          </p>
        </div>

        {/* Spice Level Preference */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#7a8b82] dark:text-[#83978d]">
            Choose Spice Preference
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Mild', 'Medium', 'Fiery'] as SpiceLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedSpice(level)}
                className={`rounded-xl border p-2.5 text-xs font-bold transition ${
                  selectedSpice === level
                    ? 'border-[#e47545] bg-[#fcedea] text-[#e47545] dark:border-[#f28b5b] dark:bg-[#341d18] dark:text-[#f28b5b]'
                    : 'border-[#dfe7de] bg-white text-[#576960] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]'
                }`}
              >
                {level === 'Mild' && '🌱 Mild'}
                {level === 'Medium' && '🌶️ Medium'}
                {level === 'Fiery' && '🔥 Fiery'}
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons Checklist */}
        {dish.availableAddons && dish.availableAddons.length > 0 && (
          <div className="mb-6">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#7a8b82] dark:text-[#83978d]">
              Optional Fresh Add-ons
            </label>
            <div className="flex flex-col gap-2">
              {dish.availableAddons.map((addon) => {
                const isSelected = selectedAddons.some((a) => a.name === addon.name)
                return (
                  <label
                    key={addon.name}
                    onClick={() => toggleAddon(addon)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-semibold transition ${
                      isSelected
                        ? 'border-[#50715c] bg-[#e7f0e7] text-[#17342e] dark:border-[#8ac29f] dark:bg-[#1a3328] dark:text-white'
                        : 'border-[#dfe7de] bg-white text-[#576960] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`grid size-4 place-items-center rounded-sm border ${
                          isSelected
                            ? 'border-[#50715c] bg-[#50715c] text-white dark:border-[#8ac29f] dark:bg-[#8ac29f] dark:text-[#0f1c18]'
                            : 'border-[#bad0bd]'
                        }`}
                      >
                        {isSelected && <Check className="size-3" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-bold">+₹{addon.price}</span>
                  </label>
                )
              })}
            </div>
          </div>
        )}

        {/* Special Cooking Instructions */}
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#7a8b82] dark:text-[#83978d]">
            Kitchen Notes (Optional)
          </label>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="e.g., Less oil, extra crispy, pack sambar separately..."
            rows={2}
            className="w-full rounded-xl border border-[#dfe7de] bg-white p-3 text-xs text-[#17342e] outline-none transition focus:border-[#17342e] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#f4f6f5]"
          />
        </div>

        {/* Quantity and Add Button */}
        <div className="flex items-center gap-3 border-t border-[#dfe7de] pt-4 dark:border-[#223b33]">
          <div className="flex items-center gap-2 rounded-xl bg-[#e7f0e7] p-1.5 dark:bg-[#1a3328]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="grid size-8 place-items-center rounded-lg bg-white text-xs font-bold text-[#17342e] shadow-2xs dark:bg-[#152520] dark:text-[#f4f6f5]"
            >
              -
            </button>
            <span className="w-6 text-center text-sm font-black text-[#17342e] dark:text-[#f4f6f5]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="grid size-8 place-items-center rounded-lg bg-white text-xs font-bold text-[#17342e] shadow-2xs dark:bg-[#152520] dark:text-[#f4f6f5]"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex flex-1 items-center justify-between rounded-xl bg-[#e47545] px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#e47545]/25 transition hover:bg-[#d06738] active:scale-98"
          >
            <div className="flex items-center gap-1.5">
              <span>Add to Basket</span>
              {dish.marketPrice > dish.price && (
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                  Save ₹{(dish.marketPrice - dish.price) * quantity}
                </span>
              )}
            </div>
            <span className="font-mono text-sm font-black">₹{finalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
