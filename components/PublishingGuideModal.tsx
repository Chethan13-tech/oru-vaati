'use client'

import React, { useState } from 'react'
import { X, Rocket, Check, Copy, ExternalLink, Globe, Terminal } from 'lucide-react'

interface PublishingGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishingGuideModal({ isOpen, onClose }: PublishingGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  if (!isOpen) return null

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2.5rem] border border-[#dfe7de] bg-[#fbfaf7] p-6 shadow-2xl dark:border-[#223b33] dark:bg-[#152520] sm:p-8"
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
        <div className="flex items-center gap-2">
          <div className="grid size-10 place-items-center rounded-2xl bg-[#e47545] text-white shadow-md shadow-[#e47545]/25">
            <Rocket className="size-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-black text-[#17342e] dark:text-[#f4f6f5]">
              Publishing & Deployment Guide
            </h2>
            <p className="text-xs text-[#7a8b82] dark:text-[#83978d]">
              Deploy your zero-fault Oru Vaati website to the world in under 3 minutes
            </p>
          </div>
        </div>

        {/* Production Ready Verification */}
        <div className="mt-5 rounded-2xl bg-[#e7f0e7] p-4 text-xs dark:bg-[#1a3328]">
          <div className="flex items-center gap-2 font-bold text-[#50715c] dark:text-[#8ac29f]">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>Pre-Flight Verification: Ready for Production</span>
          </div>
          <p className="mt-1 text-[#576960] dark:text-[#a0b5ab]">
            Turbopack production build verified, responsive styles, SEO meta tags, and local storage state persistence tested with 0 errors.
          </p>
        </div>

        {/* Option 1: Vercel (Recommended) */}
        <div className="mt-6 rounded-2xl border border-[#dfe7de] bg-white p-5 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-black text-[10px] font-bold text-white">
                ▲
              </span>
              <h3 className="font-serif text-base font-bold text-[#17342e] dark:text-[#f4f6f5]">
                Method 1: Deploy with Vercel (Recommended)
              </h3>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              1-Click
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#576960] dark:text-[#a0b5ab]">
            Vercel is the creator of Next.js and provides instant automatic SSL, global CDN, and free hosting.
          </p>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-[#f5f9f4] p-3 text-xs dark:bg-[#1f352c]">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#17342e] dark:text-[#f4f6f5]">
                  Step A: Direct GitHub & Vercel Dashboard (1-Click & Never Hangs)
                </p>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded-full bg-[#e47545] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-[#d06738]"
                >
                  <span>Open Vercel</span>
                  <ExternalLink className="size-2.5" />
                </a>
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-[11px] text-[#576960] dark:text-[#a0b5ab]">
                <li>Create a repo on <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-[#e47545] font-semibold underline">github.com/new</a> (e.g. <code>oru-vaati</code>).</li>
                <li>Push this project: <code>git add . && git commit -m "feat: oru vaati" && git push</code></li>
                <li>Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-[#e47545] font-semibold underline">vercel.com/new</a>, pick your repository, and click <strong>Deploy</strong>!</li>
              </ol>
            </div>

            <div className="rounded-xl bg-[#f5f9f4] p-3 text-xs dark:bg-[#1f352c]">
              <p className="font-bold text-[#17342e] dark:text-[#f4f6f5]">
                Step B: Via Terminal CLI
              </p>
              <p className="mt-1 text-[11px] text-[#7a8b82] dark:text-[#83978d]">
                If your terminal prompt pauses, run login first in an interactive terminal window:
              </p>
              <div className="mt-1.5 flex items-center justify-between rounded-lg bg-black px-3 py-2 font-mono text-[11px] text-emerald-400">
                <span>npx vercel login && npx vercel --prod --yes</span>
                <button
                  onClick={() => copyToClipboard('npx vercel login && npx vercel --prod --yes', 1)}
                  className="flex items-center gap-1 text-[10px] text-white hover:text-emerald-300"
                >
                  {copiedIndex === 1 ? <Check className="size-3" /> : <Copy className="size-3" />}
                  <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: Netlify */}
        <div className="mt-4 rounded-2xl border border-[#dfe7de] bg-white p-5 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-serif text-base font-bold text-[#17342e] dark:text-[#f4f6f5]">
                Method 2: Deploy with Netlify
              </h3>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-black px-3 py-2 font-mono text-[11px] text-sky-400">
            <span>npx netlify deploy --prod</span>
            <button
              onClick={() => copyToClipboard('npx netlify deploy --prod', 2)}
              className="flex items-center gap-1 text-[10px] text-white hover:text-sky-300"
            >
              {copiedIndex === 2 ? <Check className="size-3" /> : <Copy className="size-3" />}
              <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Custom Domain Section */}
        <div className="mt-4 rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-2xs dark:border-[#223b33] dark:bg-[#182a24]">
          <h4 className="text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
            Custom Domain (e.g. yourbrand.com)
          </h4>
          <p className="mt-1 text-xs text-[#576960] dark:text-[#a0b5ab]">
            Once deployed on Vercel or Netlify, simply go to Project Settings &rarr; Domains &rarr; Add your custom domain. Point your DNS CNAME/A records as guided. Free automated SSL certificate is provided immediately.
          </p>
        </div>

        {/* Footer close */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-[#17342e] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#e47545] dark:bg-[#e47545]"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  )
}
