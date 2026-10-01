'use client'

import React, { useState } from 'react'
import {
  X,
  MapPin,
  CreditCard,
  QrCode,
  Smartphone,
  Banknote,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Navigation,
} from 'lucide-react'
import { CartItem, Coupon, DeliveryAddress, Order, PaymentMethod } from '@/lib/types'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  city: string
  appliedCoupon: Coupon | null
  tipAmount: number
  onOrderPlaced: (order: Order) => void
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  city,
  appliedCoupon,
  tipAmount,
  onOrderPlaced,
}: CheckoutModalProps) {
  if (!isOpen) return null

  // Address State
  const [address, setAddress] = useState<DeliveryAddress>({
    name: 'Anand Kumar',
    phone: '+91 98401 23456',
    street: '14, 2nd Cross Street, Karpagam Avenue',
    area: city === 'Madurai' ? 'Anna Nagar' : city === 'Coimbatore' ? 'RS Puram' : 'R.A. Puram',
    city: city,
    pinCode: city === 'Madurai' ? '625020' : city === 'Coimbatore' ? '641002' : '600028',
    landmark: 'Near City Water Tank',
    label: 'Home',
  })

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi')
  const [upiId, setUpiId] = useState('anand@okhdfcbank')
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculations
  const itemsSubtotal = items.reduce((sum, item) => sum + item.itemTotalPrice, 0)
  const marketSubtotal = items.reduce((sum, item) => sum + (item.dish.marketPrice || Math.round(item.dish.price * 1.5)) * item.quantity, 0)
  const dishSavings = Math.max(0, marketSubtotal - itemsSubtotal)
  const totalCalories = items.reduce((sum, item) => sum + item.dish.kcal * item.quantity, 0)
  const isFreeDelivery = itemsSubtotal >= 149 || appliedCoupon?.discountType === 'free_delivery'
  const deliveryFee = isFreeDelivery ? 0 : 25

  let discountAmount = 0
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      const calculated = Math.round((itemsSubtotal * appliedCoupon.discountValue) / 100)
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated
    } else if (appliedCoupon.discountType === 'flat') {
      discountAmount = appliedCoupon.discountValue
    } else if (appliedCoupon.discountType === 'free_delivery') {
      discountAmount = 25
    }
  }

  const packagingFee = 10
  const platformFee = 3
  const zeroSurgeSavings = 30
  const totalSavedMoney = dishSavings + discountAmount + zeroSurgeSavings + (isFreeDelivery ? 25 : 0)

  const taxable = Math.max(0, itemsSubtotal - discountAmount)
  const gst = Math.round(taxable * 0.05)
  const finalTotal = Math.max(0, taxable + deliveryFee + packagingFee + platformFee + gst + tipAmount)

  // Auto-fill GPS mock
  const handleUseGPS = () => {
    setAddress({
      name: address.name || 'Anand Kumar',
      phone: address.phone || '+91 98401 23456',
      street: 'Flat 4B, Kaveri Palms, MG Road',
      area: 'Central ' + city,
      city: city,
      pinCode: '600001',
      landmark: 'Opposite Heritage Clock Tower',
      label: 'Home',
    })
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    setTimeout(() => {
      const now = new Date()
      const newOrder: Order = {
        id: `OV-${Math.floor(100000 + Math.random() * 900000)}`,
        date: now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        timeStr: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        items: [...items],
        subtotal: itemsSubtotal,
        marketSubtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        packagingFee,
        platformFee,
        taxes: gst,
        tip: tipAmount,
        total: finalTotal,
        savedCalories: Math.round(totalCalories * 0.15),
        savedMoney: totalSavedMoney,
        status: 'confirmed',
        address,
        paymentMethod,
        deliveryPartner: {
          name: 'Murugan S.',
          phone: '+91 97890 84321',
          rating: 4.9,
          vehicle: 'Ather 450X (TN-07-CS-4219)',
        },
        estimatedTimeMin: 15,
      }

      setIsProcessing(false)
      onOrderPlaced(newOrder)
      onClose()
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-[#dfe7de] bg-[#fbfaf7] p-6 shadow-2xl dark:border-[#223b33] dark:bg-[#152520] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfe7de] pb-4 dark:border-[#223b33]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
                Conscious Checkout
              </span>
              <span className="rounded-full bg-[#e7f0e7] px-2 py-0.5 text-[10px] font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                Secure 256-Bit
              </span>
            </div>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
              Delivery & Payment
            </h2>
          </div>

          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-2xs hover:bg-[#e47545] hover:text-white dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Section 1: Delivery Address */}
        <div className="mt-6 rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-[#e47545]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17342e] dark:text-[#f4f6f5]">
                Delivery Address in {city}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleUseGPS}
              className="flex items-center gap-1 rounded-full bg-[#e7f0e7] px-2.5 py-1 text-[11px] font-bold text-[#50715c] transition hover:bg-[#d5ebd5] dark:bg-[#1f352c] dark:text-[#8ac29f]"
            >
              <Navigation className="size-3" />
              <span>Use Current GPS</span>
            </button>
          </div>

          {/* Form fields */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Recipient Name
              </label>
              <input
                type="text"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs font-semibold outline-none dark:border-[#2b443b] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Phone Number
              </label>
              <input
                type="text"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs font-semibold outline-none dark:border-[#2b443b] dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Street Address & Flat / House No.
              </label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs font-semibold outline-none dark:border-[#2b443b] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Area / Locality
              </label>
              <input
                type="text"
                value={address.area}
                onChange={(e) => setAddress({ ...address, area: e.target.value })}
                className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs font-semibold outline-none dark:border-[#2b443b] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={address.landmark || ''}
                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs font-semibold outline-none dark:border-[#2b443b] dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Payment Method */}
        <div className="mt-5 rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <div className="flex items-center gap-2">
            <CreditCard className="size-4 text-[#e47545]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17342e] dark:text-[#f4f6f5]">
              Select Payment Method
            </h3>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition ${paymentMethod === 'upi'
                  ? 'border-[#50715c] bg-[#e7f0e7] text-[#17342e] font-bold dark:border-[#8ac29f] dark:bg-[#1f352c] dark:text-white'
                  : 'border-[#dfe7de] text-[#576960] dark:border-[#2b443b] dark:text-[#a0b5ab]'
                }`}
            >
              <Smartphone className="size-4 text-[#50715c] dark:text-[#8ac29f]" />
              <span className="text-[11px]">Instant UPI</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition ${paymentMethod === 'card'
                  ? 'border-[#50715c] bg-[#e7f0e7] text-[#17342e] font-bold dark:border-[#8ac29f] dark:bg-[#1f352c] dark:text-white'
                  : 'border-[#dfe7de] text-[#576960] dark:border-[#2b443b] dark:text-[#a0b5ab]'
                }`}
            >
              <CreditCard className="size-4 text-[#50715c] dark:text-[#8ac29f]" />
              <span className="text-[11px]">Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('netbanking')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition ${paymentMethod === 'netbanking'
                  ? 'border-[#50715c] bg-[#e7f0e7] text-[#17342e] font-bold dark:border-[#8ac29f] dark:bg-[#1f352c] dark:text-white'
                  : 'border-[#dfe7de] text-[#576960] dark:border-[#2b443b] dark:text-[#a0b5ab]'
                }`}
            >
              <Building2 className="size-4 text-[#50715c] dark:text-[#8ac29f]" />
              <span className="text-[11px]">Netbanking</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition ${paymentMethod === 'cod'
                  ? 'border-[#50715c] bg-[#e7f0e7] text-[#17342e] font-bold dark:border-[#8ac29f] dark:bg-[#1f352c] dark:text-white'
                  : 'border-[#dfe7de] text-[#576960] dark:border-[#2b443b] dark:text-[#a0b5ab]'
                }`}
            >
              <Banknote className="size-4 text-[#50715c] dark:text-[#8ac29f]" />
              <span className="text-[11px]">Cash on Del</span>
            </button>
          </div>

          {/* Conditional payment view */}
          {paymentMethod === 'upi' && (
            <div className="mt-3.5 rounded-xl bg-[#f5f9f4] p-3 text-xs dark:bg-[#1f352c]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#17342e] dark:text-[#f4f6f5]">
                  Pay via Google Pay / PhonePe / Paytm
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Zero Transaction Fee
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full rounded-lg border border-[#dfe7de] bg-white px-3 py-1.5 text-xs font-semibold outline-none dark:border-[#2b443b] dark:bg-[#152520] dark:text-white"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="mt-3.5 space-y-2 rounded-xl bg-[#f5f9f4] p-3 text-xs dark:bg-[#1f352c]">
              <input
                type="text"
                placeholder="Card Number (4532 •••• •••• 8821)"
                defaultValue="4532 8920 1192 8821"
                className="w-full rounded-lg border border-[#dfe7de] bg-white px-3 py-1.5 text-xs font-semibold outline-none dark:border-[#2b443b] dark:bg-[#152520] dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  defaultValue="08/29"
                  className="rounded-lg border border-[#dfe7de] bg-white px-3 py-1.5 text-xs font-semibold outline-none dark:border-[#2b443b] dark:bg-[#152520] dark:text-white"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  defaultValue="381"
                  className="rounded-lg border border-[#dfe7de] bg-white px-3 py-1.5 text-xs font-semibold outline-none dark:border-[#2b443b] dark:bg-[#152520] dark:text-white"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="mt-3.5 rounded-xl bg-[#f5f9f4] p-3 text-xs dark:bg-[#1f352c]">
              <p className="font-semibold text-[#17342e] dark:text-[#f4f6f5]">
                Select Bank:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['State Bank of India', 'HDFC Bank', 'Indian Bank', 'Canara Bank'].map((b) => (
                  <span
                    key={b}
                    className="cursor-pointer rounded-lg border border-[#dfe7de] bg-white px-2.5 py-1 text-[11px] font-bold text-[#17342e] hover:border-[#50715c] dark:border-[#2b443b] dark:bg-[#152520] dark:text-white"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="mt-3.5 rounded-xl bg-[#f5f9f4] p-3 text-xs text-[#576960] dark:bg-[#1f352c] dark:text-[#a0b5ab]">
              <p className="font-semibold text-[#17342e] dark:text-[#f4f6f5]">
                💵 Cash or QR at Doorstep
              </p>
              <p className="mt-1">
                Keep ₹{finalTotal} exact change ready or scan the delivery partner’s live QR code when food arrives.
              </p>
            </div>
          )}
        </div>

        {/* Security & Total Banner */}
        <div className="mt-5 flex items-center justify-between rounded-xl bg-[#e7f0e7] p-3 text-xs text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="size-4" />
            <span>Conscious Guarantee • 100% Fresh Delivery</span>
          </div>
          <div className="font-black">
            Total: <span className="font-serif text-base">₹{finalTotal}</span>
          </div>
        </div>

        {/* Place Order CTA */}
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e47545] py-4 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-[#e47545]/25 transition hover:bg-[#d06738] active:scale-98 disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Confirming with kitchen...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Confirm Order • ₹{finalTotal}</span>
              <ArrowRight className="size-4" />
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
