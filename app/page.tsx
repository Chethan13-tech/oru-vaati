'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  CITIES,
  CATEGORIES,
  RESTAURANTS,
  DISHES,
  COUPONS,
  MINDFUL_REFLECTIONS,
} from '@/lib/data'
import {
  Category,
  Dish,
  Restaurant,
  CartItem,
  Order,
  Coupon,
  DishAddon,
  SpiceLevel,
} from '@/lib/types'
import { Navbar } from '@/components/Navbar'
import { HeroBanner } from '@/components/HeroBanner'
import { CategoryTabs } from '@/components/CategoryTabs'
import { FilterSortBar, CalorieFilter, SortOption } from '@/components/FilterSortBar'
import { RestaurantCard } from '@/components/RestaurantCard'
import { DishCard } from '@/components/DishCard'
import { DishModal } from '@/components/DishModal'
import { CartDrawer } from '@/components/CartDrawer'
import { CheckoutModal } from '@/components/CheckoutModal'
import { LiveTrackingModal } from '@/components/LiveTrackingModal'
import { MindfulPauseModal } from '@/components/MindfulPauseModal'
import { OrderHistoryModal } from '@/components/OrderHistoryModal'
import { FavoritesDrawer } from '@/components/FavoritesDrawer'
import { PublishingGuideModal } from '@/components/PublishingGuideModal'
import { ReviewsSection } from '@/components/ReviewsSection'
import { Footer } from '@/components/Footer'
import { Sparkles, Utensils, Heart, ArrowRight, X } from 'lucide-react'

export default function Page() {
  // Navigation & Filtering State
  const [city, setCity] = useState<string>('Chennai')
  const [activeCategory, setActiveCategory] = useState<Category>('All cravings')
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [vegOnly, setVegOnly] = useState<boolean>(false)
  const [calorieFilter, setCalorieFilter] = useState<CalorieFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')

  // Cart & Order State
  const [cart, setCart] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [tipAmount, setTipAmount] = useState<number>(20)
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null)

  // Wishlist & Theme State
  const [favoriteDishIds, setFavoriteDishIds] = useState<string[]>([])
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>([])
  const [isDark, setIsDark] = useState<boolean>(false)

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isTrackingOpen, setIsTrackingOpen] = useState(false)
  const [isMindfulPauseOpen, setIsMindfulPauseOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false)
  const [selectedDishForModal, setSelectedDishForModal] = useState<Dish | null>(null)

  // Random Mindful Quote for Banner
  const [mindfulIndex, setMindfulIndex] = useState(0)

  // LocalStorage initialization to avoid hydration mismatch
  useEffect(() => {
    try {
      const savedCity = localStorage.getItem('oru_vaati_city')
      if (savedCity) setCity(savedCity)

      const savedCart = localStorage.getItem('oru_vaati_cart')
      if (savedCart) setCart(JSON.parse(savedCart))

      const savedOrders = localStorage.getItem('oru_vaati_orders')
      if (savedOrders) setOrders(JSON.parse(savedOrders))

      const savedFavDishes = localStorage.getItem('oru_vaati_fav_dishes')
      if (savedFavDishes) setFavoriteDishIds(JSON.parse(savedFavDishes))

      const savedFavRests = localStorage.getItem('oru_vaati_fav_rests')
      if (savedFavRests) setFavoriteRestaurantIds(JSON.parse(savedFavRests))

      const savedTheme = localStorage.getItem('oru_vaati_theme')
      if (savedTheme === 'dark') {
        setIsDark(true)
        document.documentElement.classList.add('dark')
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e)
    }
  }, [])

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('oru_vaati_cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('oru_vaati_orders', JSON.stringify(orders))
    } catch {}
  }, [orders])

  useEffect(() => {
    try {
      localStorage.setItem('oru_vaati_fav_dishes', JSON.stringify(favoriteDishIds))
    } catch {}
  }, [favoriteDishIds])

  useEffect(() => {
    try {
      localStorage.setItem('oru_vaati_fav_rests', JSON.stringify(favoriteRestaurantIds))
    } catch {}
  }, [favoriteRestaurantIds])

  const handleCityChange = (newCity: string) => {
    setCity(newCity)
    setSelectedRestaurant(null)
    try {
      localStorage.setItem('oru_vaati_city', newCity)
    } catch {}
  }

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('oru_vaati_theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('oru_vaati_theme', 'light')
      }
      return next
    })
  }

  // City-filtered restaurants
  const visibleRestaurants = useMemo(() => {
    return RESTAURANTS.filter(
      (r) => !r.city || r.city === city || r.area.toLowerCase().includes(city.toLowerCase())
    )
  }, [city])

  // Count dishes per category for badges
  const dishCountsByCategory = useMemo(() => {
    const counts: Record<Category, number> = {
      'All cravings': 0,
      'Tiffin': 0,
      'Biryani': 0,
      'Meals': 0,
      'Street food': 0,
      'Sweets': 0,
      'Drinks': 0,
    }

    DISHES.forEach((d) => {
      counts['All cravings']++
      if (d.category in counts) {
        counts[d.category]++
      }
    })

    return counts
  }, [])

  // Filtered & Sorted Dishes
  const visibleDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // 1. Restaurant filter
      if (selectedRestaurant && dish.restaurant !== selectedRestaurant) {
        return false
      }

      // 2. Category filter
      if (activeCategory !== 'All cravings' && dish.category !== activeCategory) {
        return false
      }

      // 3. Search query
      if (search.trim()) {
        const q = search.toLowerCase().trim()
        const haystack = `${dish.name} ${dish.tamilName} ${dish.restaurant} ${dish.category} ${dish.tags.join(' ')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }

      // 4. Pure Veg filter
      if (vegOnly && !dish.isVeg) {
        return false
      }

      // 5. Calorie Filter
      if (calorieFilter === 'under300' && dish.kcal > 300) return false
      if (calorieFilter === '300to500' && (dish.kcal <= 300 || dish.kcal > 500)) return false
      if (calorieFilter === 'over500' && dish.kcal <= 500) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        const restA = RESTAURANTS.find((r) => r.name === a.restaurant)?.rating || 0
        const restB = RESTAURANTS.find((r) => r.name === b.restaurant)?.rating || 0
        return restB - restA
      }
      if (sortBy === 'priceLow') return a.price - b.price
      if (sortBy === 'priceHigh') return b.price - a.price
      if (sortBy === 'caloriesLow') return a.kcal - b.kcal
      // 'recommended': bestsellers first
      if (a.isBestseller && !b.isBestseller) return -1
      if (!a.isBestseller && b.isBestseller) return 1
      return 0
    })
  }, [selectedRestaurant, activeCategory, search, vegOnly, calorieFilter, sortBy])

  // Cart operations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0)

  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id && item.selectedAddons.length === 0)
      if (existingIndex > -1) {
        const copy = [...prev]
        const current = copy[existingIndex]
        const newQty = current.quantity + 1
        copy[existingIndex] = {
          ...current,
          quantity: newQty,
          itemTotalPrice: dish.price * newQty,
        }
        return copy
      } else {
        const newItem: CartItem = {
          cartItemId: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          dish,
          quantity: 1,
          selectedSpice: dish.spiceLevel,
          selectedAddons: [],
          itemTotalPrice: dish.price,
        }
        return [...prev, newItem]
      }
    })
  }

  const handleAddToCartCustom = (
    dish: Dish,
    spice: SpiceLevel,
    addons: DishAddon[],
    notes: string,
    qty: number
  ) => {
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0)
    const unitPrice = dish.price + addonsTotal
    const totalPrice = unitPrice * qty

    const newItem: CartItem = {
      cartItemId: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      dish,
      quantity: qty,
      selectedSpice: spice,
      selectedAddons: addons,
      specialNotes: notes,
      itemTotalPrice: totalPrice,
    }

    setCart((prev) => [...prev, newItem])
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta
            if (newQty <= 0) return null
            const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0)
            const unitPrice = item.dish.price + addonsTotal
            return {
              ...item,
              quantity: newQty,
              itemTotalPrice: unitPrice * newQty,
            }
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    })
  }

  const handleRemoveFromCart = (dishName: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.dish.name === dishName)
      if (idx === -1) return prev
      const target = prev[idx]
      if (target.quantity > 1) {
        const copy = [...prev]
        const addonsTotal = target.selectedAddons.reduce((sum, a) => sum + a.price, 0)
        const unitPrice = target.dish.price + addonsTotal
        copy[idx] = {
          ...target,
          quantity: target.quantity - 1,
          itemTotalPrice: unitPrice * (target.quantity - 1),
        }
        return copy
      } else {
        return prev.filter((_, i) => i !== idx)
      }
    })
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const handleClearCart = () => setCart([])

  // Favorites handling
  const handleToggleFavoriteDish = (dishId: string) => {
    setFavoriteDishIds((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    )
  }

  const handleToggleFavoriteRestaurant = (restId: string) => {
    setFavoriteRestaurantIds((prev) =>
      prev.includes(restId) ? prev.filter((id) => id !== restId) : [...prev, restId]
    )
  }

  const favoriteDishes = useMemo(
    () => DISHES.filter((d) => favoriteDishIds.includes(d.id)),
    [favoriteDishIds]
  )

  const favoriteRestaurants = useMemo(
    () => RESTAURANTS.filter((r) => favoriteRestaurantIds.includes(r.id)),
    [favoriteRestaurantIds]
  )

  // Order Handlers
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    setAppliedCoupon(null)
    setActiveTrackingOrder(newOrder)
    setIsTrackingOpen(true)
  }

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
    )
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => (prev ? { ...prev, status: 'cancelled' } : null))
    }
  }

  const handleAcknowledgeOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'delivered', acknowledged: true } : o))
    )
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => (prev ? { ...prev, status: 'delivered', acknowledged: true } : null))
    }
  }

  const handleReorder = (order: Order) => {
    setCart(order.items)
    setIsCartOpen(true)
  }

  const hasActiveFilters = vegOnly || calorieFilter !== 'all' || sortBy !== 'recommended'
  const handleResetFilters = () => {
    setVegOnly(false)
    setCalorieFilter('all')
    setSortBy('recommended')
    setSearch('')
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#17342e] transition-colors dark:bg-[#0f1c18] dark:text-[#f4f6f5]">
      {/* Sticky Top Navbar */}
      <Navbar
        city={city}
        onCityChange={handleCityChange}
        cartCount={cartCount}
        cartTotal={cartTotal}
        favoritesCount={favoriteDishes.length + favoriteRestaurants.length}
        ordersCount={orders.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenOrders={() => setIsOrderHistoryOpen(true)}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        onOpenMindfulPause={() => setIsMindfulPauseOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero Section */}
      <HeroBanner
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => {
          document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
        city={city}
        onOpenMindfulPause={() => setIsMindfulPauseOpen(true)}
        onQuickCategoryClick={(cat) => {
          setActiveCategory(cat as Category)
          document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Category Mood Pills */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat)
          setSelectedRestaurant(null)
          document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
        dishCountsByCategory={dishCountsByCategory}
      />

      {/* Kitchens & Restaurants Section */}
      <section id="restaurants" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
              Heritage Kitchens
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#17342e] sm:text-3xl dark:text-[#f4f6f5]">
              Popular in {city}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {selectedRestaurant && (
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="flex items-center gap-1 rounded-full bg-[#fcedea] px-3 py-1.5 text-xs font-bold text-[#e47545] dark:bg-[#341d18] dark:text-[#f28b5b]"
              >
                <span>Viewing: {selectedRestaurant}</span>
                <X className="size-3.5" />
              </button>
            )}
            <span className="text-xs font-semibold text-[#7a8b82] dark:text-[#83978d]">
              {visibleRestaurants.length} verified kitchens
            </span>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurant === restaurant.name}
              isFavorite={favoriteRestaurantIds.includes(restaurant.id)}
              onToggleFavorite={handleToggleFavoriteRestaurant}
              onSelect={(restName) => {
                if (selectedRestaurant === restName) {
                  setSelectedRestaurant(null)
                } else {
                  setSelectedRestaurant(restName)
                  document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* Mindful Pause Mid-Page Banner */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#17342e] via-[#1f433b] to-[#17342e] p-7 text-white shadow-xl dark:from-[#11231d] dark:via-[#19332b] dark:to-[#11231d] sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 size-60 rounded-full bg-[#e47545]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#d6e6d4] backdrop-blur">
                <Sparkles className="size-3.5 text-[#f2a884]" />
                <span>The Oru Vaati Mindset</span>
              </div>
              <h3 className="font-serif text-2xl font-bold sm:text-3xl">
                “{MINDFUL_REFLECTIONS[mindfulIndex].quote}”
              </h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                — {MINDFUL_REFLECTIONS[mindfulIndex].source}
              </p>
            </div>

            <button
              onClick={() => setIsMindfulPauseOpen(true)}
              className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#e47545] px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#e47545]/30 transition hover:bg-[#d06738] active:scale-95"
            >
              <span>Take a 60-Sec Pause</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Menu / Dishes Section */}
      <section id="menu-section" className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e47545] dark:text-[#f28b5b]">
              {selectedRestaurant ? `${selectedRestaurant} Specialty Menu` : 'Consciously Prepared Dishes'}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#17342e] sm:text-3xl dark:text-[#f4f6f5]">
              {selectedRestaurant ? `Dishes from ${selectedRestaurant}` : 'Dishes worth savoring'}
            </h2>
          </div>

          {selectedRestaurant && (
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="self-start text-xs font-bold text-[#e47545] hover:underline dark:text-[#f28b5b]"
            >
              Show all kitchens &rarr;
            </button>
          )}
        </div>

        {/* Filter and Sort Bar */}
        <FilterSortBar
          vegOnly={vegOnly}
          onToggleVegOnly={() => setVegOnly(!vegOnly)}
          calorieFilter={calorieFilter}
          onSelectCalorieFilter={setCalorieFilter}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          totalCount={visibleDishes.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Dishes Grid */}
        {visibleDishes.length === 0 ? (
          <div className="my-12 rounded-3xl border border-dashed border-[#bad0bd] bg-white p-12 text-center dark:border-[#2b443b] dark:bg-[#152520]">
            <Utensils className="mx-auto size-12 text-[#bad0bd] dark:text-[#35594d]" />
            <h3 className="mt-4 font-serif text-xl font-bold text-[#17342e] dark:text-[#f4f6f5]">
              No dishes found matching your filters
            </h3>
            <p className="mt-1.5 text-xs text-[#7a8b82] dark:text-[#83978d]">
              Try resetting your calorie filter, search keyword, or explore other categories.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 rounded-full bg-[#17342e] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e47545] dark:bg-[#e47545]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleDishes.map((dish) => {
              const inCartItem = cart.find((c) => c.dish.id === dish.id)
              const qty = inCartItem?.quantity || 0

              return (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  quantityInCart={qty}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onOpenCustomize={(d) => setSelectedDishForModal(d)}
                  isFavorite={favoriteDishIds.includes(dish.id)}
                  onToggleFavorite={handleToggleFavoriteDish}
                />
              )
            })}
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        onOpenMindfulPause={() => setIsMindfulPauseOpen(true)}
        onCitySelect={handleCityChange}
      />

      {/* Modals & Drawers */}
      <DishModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCartCustom={handleAddToCartCustom}
        isFavorite={selectedDishForModal ? favoriteDishIds.includes(selectedDishForModal.id) : false}
        onToggleFavorite={handleToggleFavoriteDish}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        tipAmount={tipAmount}
        onSetTipAmount={setTipAmount}
        onProceedToCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        city={city}
        appliedCoupon={appliedCoupon}
        tipAmount={tipAmount}
        onOrderPlaced={handleOrderPlaced}
      />

      <LiveTrackingModal
        order={activeTrackingOrder}
        onClose={() => setIsTrackingOpen(false)}
        onCancelOrder={handleCancelOrder}
        onAcknowledgeOrder={handleAcknowledgeOrder}
      />

      <MindfulPauseModal
        isOpen={isMindfulPauseOpen}
        onClose={() => setIsMindfulPauseOpen(false)}
        onComplete={() => {
          document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        onTrackOrder={(ord) => {
          setActiveTrackingOrder(ord)
          setIsTrackingOpen(true)
        }}
        onReorder={handleReorder}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteDishes={favoriteDishes}
        favoriteRestaurants={favoriteRestaurants}
        onRemoveFavoriteDish={handleToggleFavoriteDish}
        onRemoveFavoriteRestaurant={handleToggleFavoriteRestaurant}
        onAddToCart={handleAddToCart}
        onSelectRestaurant={(name) => {
          setSelectedRestaurant(name)
          document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <PublishingGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
      />
    </main>
  )
}
