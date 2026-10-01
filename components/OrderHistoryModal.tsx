'use client'

import React from 'react'
import { X, Clock, RotateCcw, Eye, ShoppingBag, CheckCircle2, ChevronRight } from 'lucide-react'
import { Order } from '@/lib/types'

interface OrderHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
  onTrackOrder: (order: Order) => void
  onReorder: (order: Order) => void
}

export function OrderHistoryModal({
  isOpen,
  onClose,
  orders,
  onTrackOrder,
  onReorder,
}: OrderHistoryModalProps) {
  if (!isOpen) return null

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
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-2xs hover:bg-[#e47545] hover:text-white dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
              Your Journey
            </span>
            <span className="rounded-full bg-[#e7f0e7] px-2 py-0.5 text-[10px] font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
              {orders.length} orders
            </span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
            Past Orders & Tracking
          </h2>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e7f0e7] text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                <Clock className="size-8" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
                No orders placed yet
              </h3>
              <p className="mt-1.5 text-xs text-[#7a8b82] dark:text-[#83978d]">
                When you order, your live simulation and invoices will be saved right here.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-[#17342e] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#e47545] dark:bg-[#e47545]"
              >
                Explore Menus
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-2xs transition hover:border-[#17342e]/30 dark:border-[#223b33] dark:bg-[#182a24]"
              >
                <div className="flex items-start justify-between border-b border-[#dfe7de] pb-3 dark:border-[#223b33]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#17342e] dark:text-[#f4f6f5]">
                        {ord.id}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                        {ord.status === 'confirmed' ? 'Active' : 'Delivered'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#7a8b82] dark:text-[#83978d]">
                      {ord.date} at {ord.timeStr}
                    </p>
                  </div>

                  <span className="font-serif text-base font-black text-[#17342e] dark:text-[#f4f6f5]">
                    ₹{ord.total}
                  </span>
                </div>

                {/* Items summary */}
                <div className="py-3 text-xs text-[#576960] dark:text-[#a0b5ab]">
                  {ord.items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between py-0.5">
                      <span>
                        {it.quantity}x {it.dish.name}
                      </span>
                      <span className="font-semibold">₹{it.itemTotalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-[#dfe7de] pt-3 dark:border-[#223b33]">
                  <button
                    onClick={() => {
                      onTrackOrder(ord)
                      onClose()
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#e47545] hover:underline dark:text-[#f28b5b]"
                  >
                    <Eye className="size-3.5" />
                    <span>Track Live</span>
                  </button>

                  <button
                    onClick={() => {
                      onReorder(ord)
                      onClose()
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-[#e7f0e7] px-3.5 py-1.5 text-xs font-bold text-[#50715c] transition hover:bg-[#50715c] hover:text-white dark:bg-[#1f352c] dark:text-[#8ac29f]"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reorder All</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
