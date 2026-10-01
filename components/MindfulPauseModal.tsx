'use client'

import React, { useState, useEffect } from 'react'
import { X, Sparkles, Heart, Droplets, Smile, Play, RotateCcw, ArrowRight } from 'lucide-react'

interface MindfulPauseModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

type BreathingPhase = 'Inhale' | 'Hold' | 'Exhale'

export function MindfulPauseModal({
  isOpen,
  onClose,
  onComplete,
}: MindfulPauseModalProps) {
  if (!isOpen) return null

  const [secondsLeft, setSecondsLeft] = useState(45)
  const [isActive, setIsActive] = useState(true)
  const [phase, setPhase] = useState<BreathingPhase>('Inhale')
  const [cycleSeconds, setCycleSeconds] = useState(0)

  // Guided breathing cycle: 4s inhale, 4s hold, 6s exhale (14s total per cycle)
  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })

      setCycleSeconds((prev) => {
        const next = (prev + 1) % 14
        if (next < 4) setPhase('Inhale')
        else if (next < 8) setPhase('Hold')
        else setPhase('Exhale')
        return next
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive])

  const restartBreathing = () => {
    setSecondsLeft(45)
    setCycleSeconds(0)
    setPhase('Inhale')
    setIsActive(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2.5rem] border border-[#dfe7de] bg-[#fbfaf7] p-6 text-center shadow-2xl dark:border-[#223b33] dark:bg-[#152520] sm:p-8"
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
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e7] px-3.5 py-1.5 text-xs font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
          <Sparkles className="size-3.5 text-[#e47545]" />
          <span>Oru Vaati • The Conscious Reset</span>
        </div>

        <h2 className="mt-3 font-serif text-3xl font-black text-[#17342e] dark:text-[#f4f6f5]">
          Take a Gentle Pause
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#576960] dark:text-[#9bb0a5]">
          Before you order, take three slow breaths. Give your mind and stomach a moment to align.
        </p>

        {/* Breathing Orb Visualization */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          {/* Pulsing visual circles */}
          <div
            className={`grid size-44 place-items-center rounded-full border-4 transition-all duration-1000 ${
              phase === 'Inhale'
                ? 'scale-110 border-[#50715c] bg-[#e7f0e7]/70 shadow-2xl shadow-[#50715c]/25 dark:border-[#8ac29f] dark:bg-[#1a3328]/80'
                : phase === 'Hold'
                ? 'scale-110 border-[#e47545] bg-[#fceded]/70 shadow-2xl shadow-[#e47545]/25 dark:border-[#f28b5b] dark:bg-[#341d18]/80'
                : 'scale-90 border-[#17342e]/40 bg-[#f0f4ef]/50 dark:border-[#2b443b] dark:bg-[#182a24]/50'
            }`}
          >
            <div>
              <span className="font-serif text-2xl font-black text-[#17342e] dark:text-[#f4f6f5]">
                {phase}
              </span>
              <p className="mt-1 text-[11px] font-bold text-[#7a8b82] dark:text-[#9bb0a5]">
                {phase === 'Inhale'
                  ? 'Deeply through nose'
                  : phase === 'Hold'
                  ? 'Feel stillness'
                  : 'Slowly through mouth'}
              </p>
            </div>
          </div>

          <p className="mt-4 font-mono text-sm font-bold text-[#7a8b82] dark:text-[#83978d]">
            {secondsLeft > 0 ? `${secondsLeft}s remaining` : '✨ Reset complete!'}
          </p>
        </div>

        {/* 3 Quick Mindful Checks */}
        <div className="grid grid-cols-3 gap-2.5 text-left">
          <div className="rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
            <Droplets className="size-4 text-sky-600 dark:text-sky-400" />
            <h4 className="mt-2 text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
              Hydrated?
            </h4>
            <p className="mt-1 text-[10px] leading-4 text-[#7a8b82] dark:text-[#83978d]">
              Thirst often pretends to be hunger. Sip water first.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
            <Heart className="size-4 text-rose-500" />
            <h4 className="mt-2 text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
              Real Hunger?
            </h4>
            <p className="mt-1 text-[10px] leading-4 text-[#7a8b82] dark:text-[#83978d]">
              Is it hunger or tiredness? Eat what truly restores you.
            </p>
          </div>

          <div className="rounded-2xl border border-[#dfe7de] bg-white p-3 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
            <Smile className="size-4 text-[#e47545] dark:text-[#f28b5b]" />
            <h4 className="mt-2 text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
              No Guilt
            </h4>
            <p className="mt-1 text-[10px] leading-4 text-[#7a8b82] dark:text-[#83978d]">
              If you decide to order, savor every mouthful with joy!
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={restartBreathing}
            className="flex items-center gap-1.5 rounded-full border border-[#dfe7de] bg-white px-4 py-2.5 text-xs font-bold text-[#576960] shadow-2xs hover:bg-[#e7f0e7] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#a0b5ab]"
          >
            <RotateCcw className="size-3.5" />
            <span>Restart Timer</span>
          </button>

          <button
            onClick={() => {
              onComplete()
              onClose()
            }}
            className="flex items-center gap-2 rounded-full bg-[#e47545] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#e47545]/25 transition hover:bg-[#d06738] active:scale-95"
          >
            <span>I'm Ready to Order</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
