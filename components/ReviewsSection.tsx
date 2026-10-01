'use client'

import React, { useState } from 'react'
import { Star, Quote, CheckCircle, MessageSquarePlus, Sparkles } from 'lucide-react'
import { REVIEWS } from '@/lib/data'
import { Review } from '@/lib/types'

export function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS)
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [newAuthor, setNewAuthor] = useState('')
  const [newLocation, setNewLocation] = useState('Chennai')
  const [newComment, setNewComment] = useState('')
  const [newDish, setNewDish] = useState('Ghee Podi Idli')
  const [newRating, setNewRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAuthor.trim() || !newComment.trim()) return

    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: `${newLocation}, Tamil Nadu`,
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      dishOrdered: newDish,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    }

    setReviewsList([created, ...reviewsList])
    setSubmitted(true)
    setTimeout(() => {
      setIsAddingReview(false)
      setSubmitted(false)
      setNewAuthor('')
      setNewComment('')
    }, 1800)
  }

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
              Conscious Food Community
            </span>
            <span className="rounded-full bg-[#e7f0e7] px-2 py-0.5 text-[10px] font-bold text-[#50715c] dark:bg-[#1a3328] dark:text-[#8ac29f]">
              4.9★ Average
            </span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#17342e] sm:text-3xl dark:text-[#f4f6f5]">
            Loved across Tamil Nadu
          </h2>
        </div>

        <button
          onClick={() => setIsAddingReview(!isAddingReview)}
          className="flex items-center gap-2 self-start rounded-full border border-[#dfe7de] bg-white px-4 py-2 text-xs font-bold text-[#17342e] shadow-2xs hover:border-[#17342e] dark:border-[#2b443b] dark:bg-[#182a24] dark:text-[#f4f6f5]"
        >
          <MessageSquarePlus className="size-3.5 text-[#e47545]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Add Review Form */}
      {isAddingReview && (
        <form
          onSubmit={handleAddReview}
          className="mt-6 rounded-3xl border border-[#dfe7de] bg-white p-5 shadow-sm dark:border-[#223b33] dark:bg-[#182a24]"
        >
          <h3 className="font-serif text-lg font-bold text-[#17342e] dark:text-[#f4f6f5]">
            Share your mindful dining experience
          </h3>

          {submitted ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <CheckCircle className="size-4" />
              <span>Nandri! Your review has been added to the collective.</span>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Vignesh R."
                    className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs outline-none dark:border-[#2b443b] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                    City
                  </label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs outline-none dark:border-[#2b443b] dark:text-white"
                  >
                    <option value="Chennai" className="dark:bg-[#182a24]">Chennai</option>
                    <option value="Coimbatore" className="dark:bg-[#182a24]">Coimbatore</option>
                    <option value="Madurai" className="dark:bg-[#182a24]">Madurai</option>
                    <option value="Salem" className="dark:bg-[#182a24]">Salem</option>
                    <option value="Trichy" className="dark:bg-[#182a24]">Trichy</option>
                    <option value="Thanjavur" className="dark:bg-[#182a24]">Thanjavur</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                    Dish Enjoyed
                  </label>
                  <input
                    type="text"
                    required
                    value={newDish}
                    onChange={(e) => setNewDish(e.target.value)}
                    placeholder="e.g. Madurai Bun Parotta"
                    className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs outline-none dark:border-[#2b443b] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-[#7a8b82] dark:text-[#83978d]">
                  Your Experience
                </label>
                <textarea
                  required
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How did the food taste? Did the mindful pause help your choice?"
                  className="w-full rounded-xl border border-[#dfe7de] bg-transparent px-3 py-2 text-xs outline-none dark:border-[#2b443b] dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingReview(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#7a8b82]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#e47545] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#d06738]"
                >
                  Post Review
                </button>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Grid of Reviews */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {reviewsList.map((review) => (
          <div
            key={review.id}
            className="flex flex-col justify-between rounded-3xl border border-[#dfe7de] bg-white p-5 shadow-2xs transition hover:border-[#17342e]/30 hover:shadow-md dark:border-[#223b33] dark:bg-[#152520]"
          >
            <div>
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#e47545]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <Quote className="size-4 text-[#bad0bd] dark:text-[#2b443b]" />
              </div>

              {/* Comment */}
              <p className="mt-3.5 text-xs leading-5 text-[#576960] dark:text-[#a0b5ab]">
                "{review.comment}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-5 flex items-center gap-3 border-t border-[#dfe7de] pt-3.5 dark:border-[#223b33]">
              <img
                src={review.avatar}
                alt={review.author}
                className="size-9 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-bold text-[#17342e] dark:text-[#f4f6f5]">
                  {review.author}
                </h4>
                <p className="truncate text-[10px] text-[#7a8b82] dark:text-[#83978d]">
                  {review.location} • <span className="font-semibold text-[#50715c] dark:text-[#8ac29f]">{review.dishOrdered}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
