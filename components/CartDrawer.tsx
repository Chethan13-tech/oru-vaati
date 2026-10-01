'use client'

import React, { useState } from 'react'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Bike,
  Heart,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { CartItem, Coupon } from '@/lib/types'
import { COUPONS } from '@/lib/data'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (cartItemId: string, delta: number) => void
  onRemoveItem: (cartItemId: string) => void
  onClearCart: () => void
  appliedCoupon: Coupon | null
  onApplyCoupon: (coupon: Coupon | null) => void
  tipAmount: number
  onSetTipAmount: (amount: number) => void
  onProceedToCheckout: () => void
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedCoupon,
  onApplyCoupon,
  tipAmount,
  onSetTipAmount,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  if (!isOpen) return null

  // Financial calculations
  const itemsSubtotal = items.reduce((sum, item) => sum + item.itemTotalPrice, 0)
  const marketSubtotal = items.reduce((sum, item) => sum + (item.dish.marketPrice || Math.round(item.dish.price * 1.5)) * item.quantity, 0)
  const dishSavings = Math.max(0, marketSubtotal - itemsSubtotal)
  const totalCalories = items.reduce((sum, item) => sum + item.dish.kcal * item.quantity, 0)

  // Reasonable Tamil Nadu free delivery threshold: ₹149
  const freeDeliveryThreshold = 149
  const isFreeDeliveryEligible = itemsSubtotal >= freeDeliveryThreshold
  const amountNeededForFreeDel = Math.max(0, freeDeliveryThreshold - itemsSubtotal)
  const freeDeliveryProgress = Math.min(100, Math.round((itemsSubtotal / freeDeliveryThreshold) * 100))

  let baseDeliveryFee = isFreeDeliveryEligible ? 0 : 25
  let discountAmount = 0

  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      const calculated = Math.round((itemsSubtotal * appliedCoupon.discountValue) / 100)
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated
    } else if (appliedCoupon.discountType === 'flat') {
      discountAmount = appliedCoupon.discountValue
    } else if (appliedCoupon.discountType === 'free_delivery') {
      baseDeliveryFee = 0
      discountAmount = 25
    }
  }

  const packagingFee = items.length > 0 ? 10 : 0
  const platformFee = items.length > 0 ? 3 : 0
  const zeroSurgeSavings = items.length > 0 ? 30 : 0
  const totalSaved = dishSavings + discountAmount + zeroSurgeSavings + (isFreeDeliveryEligible ? 25 : 0)

  const taxableAmount = Math.max(0, itemsSubtotal - discountAmount)
  const gst = Math.round(taxableAmount * 0.05)
  const finalTotal = Math.max(0, taxableAmount + baseDeliveryFee + packagingFee + platformFee + gst + tipAmount)

  const handleApplyCustomCoupon = () => {
    setCouponError('')
    const trimmed = couponInput.trim().toUpperCase()
    if (!trimmed) return

    const found = COUPONS.find((c) => c.code === trimmed)
    if (!found) {
      setCouponError('Invalid coupon code. Try FIRSTBITE or MINDFUL50')
      return
    }

    if (itemsSubtotal < found.minOrder) {
      setCouponError(`Min order value of ₹${found.minOrder} required for ${found.code}`)
      return
    }

    onApplyCoupon(found)
    setCouponInput('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-md flex-col justify-between bg-[#fbfaf7] p-5 shadow-2xl transition-transform duration-300 dark:bg-[#152520] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#dfe7de] pb-4 dark:border-[#223b33]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
                  Conscious Feast
                </span>
                <span className="rounded-full bg-[#e7f0e7] px-2 py-0.5 text-[10px] font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                  {items.length} dishes
                </span>
              </div>
              <h2 className="mt-0.5 font-serif text-2xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
                Your Basket
              </h2>
            </div>

            <button
              onClick={onClose}
              className="grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-2xs transition hover:bg-[#e47545] hover:text-white dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]"
              aria-label="Close basket"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Free delivery progress meter */}
          {items.length > 0 && (
            <div className="mt-3.5 rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
              <div className="flex items-center justify-between text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                <div className="flex items-center gap-1.5">
                  <Bike className="size-4 text-[#e47545]" />
                  <span>
                    {isFreeDeliveryEligible
                      ? '🎉 You unlocked FREE Delivery!'
                      : `Add ₹${amountNeededForFreeDel} more for FREE delivery`}
                  </span>
                </div>
                <span className="text-[#50715c] dark:text-[#8ac29f]">
                  {freeDeliveryProgress}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e7f0e7] dark:bg-[#1f352c]">
                <div
                  className="h-full rounded-full bg-[#50715c] transition-all duration-500 dark:bg-[#8ac29f]"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Center: Items or Empty State (Scrollable) */}
        <div className="no-scrollbar my-4 flex-1 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="grid size-16 place-items-center rounded-full bg-[#e7f0e7] text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                <ShoppingBag className="size-8" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
                Your basket is empty
              </h3>
              <p className="mt-1.5 max-w-xs text-xs text-[#7a8b82] dark:text-[#83978d]">
                Explore authentic Tamil Nadu tiffins, fragrant biryanis, or refreshing coolers.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-[#17342e] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#e47545] dark:bg-[#e47545]"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="rounded-2xl border border-[#dfe7de] bg-white p-3.5 shadow-2xs transition hover:border-[#17342e]/30 dark:border-[#223b33] dark:bg-[#182a24]"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="size-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="truncate font-serif text-sm font-bold text-[#17342e] dark:text-[#f4f6f5]">
                          {item.dish.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#9bb0a5] hover:text-rose-600 transition"
                          title="Remove item"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] font-medium text-[#7a8b82] dark:text-[#83978d]">
                        {item.dish.restaurant} • {item.selectedSpice}
                      </p>

                      {/* Addons display if any */}
                      {item.selectedAddons.length > 0 && (
                        <p className="mt-0.5 text-[10px] text-[#50715c] dark:text-[#8ac29f]">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}

                      {/* Price and Counter */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-sm font-bold text-[#17342e] dark:text-[#f4f6f5]">
                            ₹{item.itemTotalPrice}
                          </span>
                          {item.dish.marketPrice > item.dish.price && (
                            <span className="text-[10px] text-[#9bb0a5] line-through">
                              ₹{item.dish.marketPrice * item.quantity}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 rounded-lg bg-[#f0f4ef] p-1 dark:bg-[#1f352c]">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            className="grid size-6 place-items-center rounded bg-white text-xs font-bold text-[#17342e] shadow-2xs transition hover:bg-rose-50 dark:bg-[#152520] dark:text-white"
                          >
                            <Minus className="size-2.5" />
                          </button>
                          <span className="w-4 text-center text-xs font-black text-[#17342e] dark:text-[#f4f6f5]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            className="grid size-6 place-items-center rounded bg-white text-xs font-bold text-[#17342e] shadow-2xs transition hover:bg-emerald-50 dark:bg-[#152520] dark:text-white"
                          >
                            <Plus className="size-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input & Badges */}
              <div className="rounded-2xl border border-[#dfe7de] bg-white p-3.5 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-[#e47545]" />
                  <span className="text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                    Promo Offers
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#e7f0e7] p-2.5 text-xs font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-[#50715c]" />
                      <span>{appliedCoupon.code} applied (Saved ₹{discountAmount})</span>
                    </div>
                    <button
                      onClick={() => onApplyCoupon(null)}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="mt-2.5 flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter code (e.g. FIRSTBITE)"
                      className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-wider outline-none dark:border-[#2b443b] dark:text-white"
                    />
                    <button
                      onClick={handleApplyCustomCoupon}
                      className="rounded-xl bg-[#17342e] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#e47545] dark:bg-[#203a31]"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="mt-1.5 text-[11px] font-semibold text-rose-600">
                    {couponError}
                  </p>
                )}

                {/* Quick select coupons */}
                {!appliedCoupon && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pt-1">
                    {COUPONS.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          if (itemsSubtotal >= c.minOrder) {
                            onApplyCoupon(c)
                            setCouponError('')
                          } else {
                            setCouponError(`Min ₹${c.minOrder} needed for ${c.code}`)
                          }
                        }}
                        className="rounded-md bg-[#fcedea] px-2 py-0.5 text-[10px] font-bold text-[#e47545] transition hover:bg-[#e47545] hover:text-white dark:bg-[#341d18] dark:text-[#f28b5b]"
                        title={c.description}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Delivery Partner Tip */}
              <div className="rounded-2xl border border-[#dfe7de] bg-white p-3.5 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                    Tip your delivery champion
                  </span>
                  <span className="text-[10px] text-[#7a8b82] dark:text-[#83978d]">
                    100% goes to partner
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {[0, 20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => onSetTipAmount(amount)}
                      className={`rounded-xl border py-1.5 text-xs font-bold transition ${
                        tipAmount === amount
                          ? 'border-[#50715c] bg-[#e7f0e7] text-[#50715c] dark:border-[#8ac29f] dark:bg-[#1a3328] dark:text-[#8ac29f]'
                          : 'border-[#dfe7de] bg-white text-[#576960] dark:border-[#2b443b] dark:bg-[#152520] dark:text-[#a0b5ab]'
                      }`}
                    >
                      {amount === 0 ? 'None' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bill Breakdown & Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t border-[#dfe7de] pt-4 dark:border-[#223b33]">
            {/* Mindful calorie badge */}
            <div className="mb-3 flex items-center justify-between rounded-xl bg-[#e7f0e7] px-3 py-1.5 text-xs font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5" />
                <span>Estimated Nutrition Total</span>
              </span>
              <span>{totalCalories} kcal</span>
            </div>

            {/* Celebratory Tamil Nadu Savings Banner */}
            <div className="mb-3 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-3 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <span>🎉</span>
                  <span>Tamil Nadu Honest Savings</span>
                </span>
                <span className="font-serif text-sm font-black text-amber-200">Save ₹{totalSaved}</span>
              </div>
              <p className="mt-1 text-[10px] text-emerald-100 leading-4">
                Local kitchen pricing saves ₹{dishSavings} + ₹{zeroSurgeSavings} surge fee waiver{discountAmount > 0 ? ` + ₹${discountAmount} coupon` : ''} compared to big aggregator apps!
              </p>
            </div>

            {/* Bill rows */}
            <div className="space-y-1.5 text-xs text-[#576960] dark:text-[#9bb0a5]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#17342e] dark:text-[#f4f6f5]">₹{itemsSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#50715c] dark:text-[#8ac29f]">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span>{baseDeliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${baseDeliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Mindful Eco-Packaging</span>
                <span>₹{packagingFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between text-[#e47545]">
                  <span>Delivery Tip</span>
                  <span>₹{tipAmount}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#dfe7de] pt-2 text-sm font-black text-[#17342e] dark:border-[#223b33] dark:text-[#f4f6f5]">
                <span>Total to Pay</span>
                <span className="font-serif text-lg">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onProceedToCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e47545] py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xl shadow-[#e47545]/25 transition hover:bg-[#d06738] active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
