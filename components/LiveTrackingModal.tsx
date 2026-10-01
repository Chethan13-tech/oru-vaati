'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  CheckCircle2,
  Clock,
  Bike,
  Phone,
  Navigation,
  Sparkles,
  WalletCards,
  Receipt,
  Bell,
  Star,
  FastForward,
  Play,
  RotateCcw,
  Volume2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Order } from '@/lib/types'

interface LiveTrackingModalProps {
  order: Order | null
  onClose: () => void
  onCancelOrder: (orderId: string) => void
  onAcknowledgeOrder?: (orderId: string) => void
}

export function LiveTrackingModal({
  order,
  onClose,
  onCancelOrder,
  onAcknowledgeOrder,
}: LiveTrackingModalProps) {
  if (!order) return null

  // Stages:
  // 0: Confirmed (0-6s)
  // 1: Cooking with Care (6-16s)
  // 2: On The Way (16-28s)
  // 3: At Doorstep (28s+ with Doorbell!)
  // 4: Acknowledged & Delivered!
  const [activeStage, setActiveStage] = useState<number>(0)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0)
  const [simSpeed, setSimSpeed] = useState<number>(1) // 1x or 3x
  const [isAcknowledged, setIsAcknowledged] = useState<boolean>(order.acknowledged || false)
  const [userRating, setUserRating] = useState<number>(5)
  const [showInvoice, setShowInvoice] = useState(false)
  const [callAlert, setCallAlert] = useState(false)
  const [bellRinging, setBellRinging] = useState(false)
  const hasChimed = useRef(false)

  // Web Audio API synthesized Doorbell Chime (Ding-Dong)
  const playDoorbellSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      // High Note - Ding (587.33 Hz - D5)
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime)
      gain1.gain.setValueAtTime(0.3, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 0.8)

      // Low Note - Dong (440 Hz - A4)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(440, ctx.currentTime + 0.35)
      gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.35)
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.3)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start(ctx.currentTime + 0.35)
      osc2.stop(ctx.currentTime + 1.3)

      setBellRinging(true)
      setTimeout(() => setBellRinging(false), 2000)
    } catch (e) {
      console.log('Web Audio doorbell play error', e)
    }
  }

  // Fast-paced realistic delivery simulation (takes ~30-40 seconds in real-time)
  useEffect(() => {
    if (isAcknowledged) return

    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + simSpeed

        if (next >= 28 && activeStage < 3) {
          setActiveStage(3)
          if (!hasChimed.current) {
            hasChimed.current = true
            playDoorbellSound()
          }
        } else if (next >= 16 && activeStage < 2) {
          setActiveStage(2)
        } else if (next >= 6 && activeStage < 1) {
          setActiveStage(1)
        }

        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [simSpeed, activeStage, isAcknowledged])

  // Estimated arrival calculation
  const totalSimSeconds = 30
  const remainingSim = Math.max(0, totalSimSeconds - secondsElapsed)
  const remainingMinutes = activeStage >= 3 ? 0 : Math.max(1, Math.ceil((remainingSim / totalSimSeconds) * 12))

  const stages = [
    {
      title: 'Order Confirmed',
      desc: 'Kitchen verified order & initiated preparation',
      time: order.timeStr,
    },
    {
      title: 'Chef Cooking with Care',
      desc: 'Freshly griddled with cold-pressed oil & packed in mandharai leaves',
      time: 'In Kitchen',
    },
    {
      title: 'Partner On The Way',
      desc: 'Murugan S. is cruising towards your gate on Ather 450X',
      time: activeStage >= 3 ? 'Arrived' : `~${remainingMinutes} min away`,
    },
    {
      title: 'At Your Doorstep 🔔',
      desc: 'Rider is ringing the doorbell with your hot meal parcel',
      time: 'At Door',
    },
  ]

  const handleCallDriver = () => {
    setCallAlert(true)
    setTimeout(() => setCallAlert(false), 4000)
  }

  const handleFastForwardToDoor = () => {
    setSecondsElapsed(28)
    setActiveStage(3)
    if (!hasChimed.current) {
      hasChimed.current = true
      playDoorbellSound()
    }
  }

  const handleAcknowledge = () => {
    setIsAcknowledged(true)
    setActiveStage(4)
    if (onAcknowledgeOrder) {
      onAcknowledgeOrder(order.id)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2.5rem] border border-[#dfe7de] bg-[#fbfaf7] p-6 shadow-2xl dark:border-[#223b33] dark:bg-[#152520] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-[#dfe7de] bg-white text-[#61736a] shadow-2xs hover:bg-[#e47545] hover:text-white dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]"
          aria-label="Close tracking"
        >
          <X className="size-4" />
        </button>

        {/* Top Header & Simulation Controls */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 pr-10">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-[#e7f0e7] px-2.5 py-0.5 text-[10px] font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
                <span className="size-2 animate-ping rounded-full bg-emerald-500" />
                Live Fast Delivery Simulation
              </span>
              <span className="text-xs font-mono font-bold text-[#7a8b82] dark:text-[#83978d]">
                {order.id}
              </span>
            </div>

            {/* Fast-forward simulation pill */}
            {activeStage < 3 && !isAcknowledged && (
              <button
                onClick={handleFastForwardToDoor}
                className="flex items-center gap-1 rounded-full bg-[#fcedea] px-2.5 py-0.5 text-[10px] font-bold text-[#e47545] transition hover:bg-[#e47545] hover:text-white dark:bg-[#341d18] dark:text-[#f28b5b]"
                title="Fast forward directly to doorbell ring"
              >
                <FastForward className="size-3" />
                <span>Skip to Door</span>
              </button>
            )}
          </div>

          <h2 className="mt-2 font-serif text-2xl font-bold text-[#17342e] sm:text-3xl dark:text-[#f4f6f5]">
            {isAcknowledged
              ? 'Delivered & Received! 🛍️'
              : activeStage >= 3
              ? '🔔 At Your Doorstep!'
              : 'Delivering In Minutes...'}
          </h2>
          <p className="mt-0.5 text-xs text-[#7a8b82] dark:text-[#83978d]">
            Delivering to {order.address.street}, {order.address.area}, {order.address.city}
          </p>
        </div>

        {/* SPECIAL DOORSTEP ALERT & ACKNOWLEDGEMENT CARD */}
        {activeStage >= 3 && (
          <div className="mt-5 overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 p-4 shadow-lg animate-in zoom-in-95 duration-300 dark:border-amber-500/40 dark:from-amber-950/40 dark:to-orange-950/40">
            <div className="flex items-start gap-3">
              {/* Ringing bell icon */}
              <div
                className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30 ${
                  bellRinging ? 'animate-bounce scale-110' : ''
                }`}
              >
                <Bell className="size-6 animate-pulse" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-black text-[#17342e] dark:text-white">
                    *DING DONG!* Delivery at Door
                  </h3>
                  <button
                    onClick={playDoorbellSound}
                    className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-amber-700 shadow-2xs hover:bg-amber-100 dark:bg-[#182a24] dark:text-amber-300"
                    title="Play Doorbell Sound Again"
                  >
                    <Volume2 className="size-3" />
                    <span>Ring Bell</span>
                  </button>
                </div>

                <p className="mt-1 text-xs text-[#576960] dark:text-[#a0b5ab]">
                  Delivery partner <strong>Murugan S.</strong> has arrived with your warm, fragrant food package.
                </p>

                {/* USER ACKNOWLEDGEMENT BUTTON */}
                {!isAcknowledged ? (
                  <button
                    onClick={handleAcknowledge}
                    className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-emerald-700/25 transition hover:scale-[1.02] active:scale-95"
                  >
                    <CheckCircle2 className="size-4" />
                    <span>I Have Received My Order! (Acknowledge)</span>
                  </button>
                ) : (
                  <div className="mt-3.5 rounded-xl bg-emerald-600 p-3 text-center text-xs font-bold text-white shadow-md">
                    <p className="flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="size-4" />
                      <span>Order Received with Gratitude!</span>
                    </p>
                    <p className="mt-1 text-[11px] font-normal text-emerald-100">
                      Savor each bite slowly. Thank you for choosing a mindful meal.
                    </p>

                    {/* Star Rating Widget */}
                    <div className="mt-2.5 flex items-center justify-center gap-1">
                      <span className="text-[10px] mr-1 text-emerald-200">Rate Kitchen:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="text-amber-300 transition hover:scale-125"
                        >
                          <Star
                            className={`size-4 ${
                              star <= userRating ? 'fill-current text-amber-300' : 'text-emerald-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Estimated Timer Card (If not yet acknowledged) */}
        {!isAcknowledged && (
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#17342e] to-[#254d42] p-4 text-white shadow-lg dark:from-[#11231d] dark:to-[#1c382f]">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-white backdrop-blur">
                <Clock className="size-5 text-[#f2a884]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Estimated Delivery Time
                </p>
                <p className="font-serif text-xl font-black">
                  {activeStage >= 3 ? 'Arrived at Gate!' : `Arriving in ${remainingMinutes} mins`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#e47545] px-3 py-1 text-xs font-bold shadow-sm">
                {activeStage === 0
                  ? 'Confirmed'
                  : activeStage === 1
                  ? 'Cooking'
                  : activeStage === 2
                  ? 'In Transit'
                  : 'At Door'}
              </span>
            </div>
          </div>
        )}

        {/* Interactive Simulated Route Graphic */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <div className="flex items-center justify-between text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
            <span>{order.items[0]?.dish.restaurant || 'Heritage Kitchen'}</span>
            <span className="text-[#50715c] dark:text-[#8ac29f]">Your Doorstep</span>
          </div>

          {/* Stylized route path */}
          <div className="relative my-4 flex items-center justify-between px-2">
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#dfe7de] dark:border-[#2b443b]" />

            {/* Kitchen Icon */}
            <div className="relative z-10 grid size-8 place-items-center rounded-full bg-[#50715c] text-white shadow-sm">
              <Navigation className="size-4" />
            </div>

            {/* Rider moving on route */}
            <div
              className="relative z-10 grid size-9 place-items-center rounded-full bg-[#e47545] text-white shadow-md transition-all duration-700"
              style={{
                transform: `translateX(${
                  activeStage === 0
                    ? '-60px'
                    : activeStage === 1
                    ? '-20px'
                    : activeStage === 2
                    ? '35px'
                    : '85px'
                })`,
              }}
            >
              <Bike className="size-4.5" />
            </div>

            {/* Destination Icon */}
            <div
              className={`relative z-10 grid size-8 place-items-center rounded-full text-white shadow-sm ${
                activeStage >= 3 ? 'bg-amber-500 animate-pulse' : 'bg-[#17342e]'
              }`}
            >
              {activeStage >= 3 ? <Bell className="size-4" /> : <CheckCircle2 className="size-4" />}
            </div>
          </div>
        </div>

        {/* Live Delivery Partner Card */}
        <div className="mt-4 rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative size-11 overflow-hidden rounded-full bg-[#e7f0e7] dark:bg-[#1f352c]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Driver Avatar"
                  className="size-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                  {order.deliveryPartner.name}
                </h4>
                <p className="text-[11px] text-[#7a8b82] dark:text-[#83978d]">
                  ⭐ {order.deliveryPartner.rating} • {order.deliveryPartner.vehicle}
                </p>
              </div>
            </div>

            <button
              onClick={handleCallDriver}
              className="flex items-center gap-1.5 rounded-full bg-[#e7f0e7] px-3 py-1.5 text-xs font-bold text-[#50715c] transition hover:bg-[#50715c] hover:text-white dark:bg-[#1f352c] dark:text-[#8ac29f]"
            >
              <Phone className="size-3.5" />
              <span>Call</span>
            </button>
          </div>

          {callAlert && (
            <div className="mt-2.5 rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              📞 Connected to Murugan S. (+91 97890 84321): "Vanakkam! I have your food sealed warm, arriving right now!"
            </div>
          )}
        </div>

        {/* Milestone Timeline */}
        <div className="mt-5 space-y-3.5 border-l-2 border-[#dfe7de] pl-5 dark:border-[#223b33]">
          {stages.map((st, idx) => {
            const isCompleted = idx <= activeStage
            const isCurrent = idx === activeStage

            return (
              <div key={st.title} className="relative">
                <div
                  className={`absolute -left-[27px] top-0 grid size-5 place-items-center rounded-full text-[10px] font-bold ${
                    isCompleted
                      ? 'bg-[#50715c] text-white dark:bg-[#8ac29f] dark:text-[#0f1c18]'
                      : 'border-2 border-[#dfe7de] bg-white text-[#7a8b82] dark:border-[#2b443b] dark:bg-[#152520]'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-[#e47545] dark:text-[#f28b5b]'
                          : isCompleted
                          ? 'text-[#17342e] dark:text-[#f4f6f5]'
                          : 'text-[#8fa298] dark:text-[#6a8075]'
                      }`}
                    >
                      {st.title}
                    </p>
                    <span className="text-[10px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                      {st.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#7a8b82] dark:text-[#83978d]">
                    {st.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* TAMIL NADU EXACT SAVINGS BANNER */}
        <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WalletCards className="size-5 text-amber-300" />
              <span className="font-serif text-sm font-bold">Tamil Nadu Honest Savings</span>
            </div>
            <span className="font-serif text-base font-black text-amber-300">
              ₹{order.savedMoney} Saved!
            </span>
          </div>
          <p className="mt-1 text-xs text-emerald-100 leading-5">
            By ordering through Oru Vaati local kitchen rates instead of marked-up aggregator pricing, you saved{' '}
            <strong>₹{order.savedMoney}</strong> and conscious mindful portioning saved you approximately{' '}
            <strong>{order.savedCalories} kcal</strong>.
          </p>
        </div>

        {/* Collapsible Order Invoice */}
        <div className="mt-4 rounded-2xl border border-[#dfe7de] bg-white p-3.5 dark:border-[#223b33] dark:bg-[#182a24]">
          <button
            onClick={() => setShowInvoice(!showInvoice)}
            className="flex w-full items-center justify-between text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]"
          >
            <span className="flex items-center gap-1.5">
              <Receipt className="size-3.5 text-[#e47545]" />
              <span>View Full Invoice & Item Breakdown</span>
            </span>
            {showInvoice ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          {showInvoice && (
            <div className="mt-3 border-t border-[#dfe7de] pt-3 text-xs dark:border-[#223b33]">
              <div className="space-y-1.5">
                {order.items.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-[#576960] dark:text-[#a0b5ab]">
                    <span>
                      {item.quantity}x {item.dish.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.dish.marketPrice > item.dish.price && (
                        <span className="text-[10px] text-[#9bb0a5] line-through">
                          ₹{item.dish.marketPrice * item.quantity}
                        </span>
                      )}
                      <span className="font-semibold text-[#17342e] dark:text-white">
                        ₹{item.itemTotalPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 space-y-1 border-t border-[#dfe7de] pt-2 text-[11px] text-[#7a8b82] dark:border-[#223b33] dark:text-[#83978d]">
                <div className="flex justify-between">
                  <span>Dish Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Partner Fee</span>
                  <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco-Packaging & Platform Fee</span>
                  <span>₹{order.packagingFee + order.platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{order.taxes}</span>
                </div>
                {order.tip > 0 && (
                  <div className="flex justify-between">
                    <span>Rider Tip</span>
                    <span>₹{order.tip}</span>
                  </div>
                )}
              </div>

              <div className="mt-2.5 flex justify-between border-t border-[#dfe7de] pt-2 font-bold text-[#17342e] dark:border-[#223b33] dark:text-[#f4f6f5]">
                <span>Total Paid via {order.paymentMethod.toUpperCase()}</span>
                <span className="font-serif text-sm">₹{order.total}</span>
              </div>
            </div>
          )}
        </div>

        {/* Cancel button if early stage */}
        {activeStage <= 1 && (
          <button
            onClick={() => onCancelOrder(order.id)}
            className="mt-4 w-full text-center text-xs font-semibold text-rose-600 hover:underline"
          >
            Cancel Order (Before Kitchen Dispatches)
          </button>
        )}
      </div>
    </div>
  )
}
