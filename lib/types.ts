export type Category = 'All cravings' | 'Tiffin' | 'Meals' | 'Biryani' | 'Street food' | 'Sweets' | 'Drinks'

export type SpiceLevel = 'Mild' | 'Medium' | 'Fiery'

export interface DishAddon {
  name: string
  price: number
}

export interface Dish {
  id: string
  name: string
  tamilName: string
  restaurant: string
  city?: string
  category: Exclude<Category, 'All cravings'>
  price: number // Reasonable real Tamil Nadu local kitchen price
  marketPrice: number // Typical aggregator price (to calculate and show savings)
  kcal: number
  image: string
  isVeg: boolean
  isBestseller?: boolean
  spiceLevel: SpiceLevel
  description: string
  portion: string
  protein: number
  carbs: number
  fat: number
  availableAddons?: DishAddon[]
  tags: string[]
}

export interface Restaurant {
  id: string
  name: string
  tagline: string
  area: string
  city: string
  rating: number
  reviewsCount: string
  time: string
  distance: string
  priceForTwo: number
  tag: string
  image: string
  isPureVeg: boolean
  specialty: string
  isFeatured?: boolean
}

export interface CartItem {
  cartItemId: string
  dish: Dish
  quantity: number
  selectedSpice: SpiceLevel
  selectedAddons: DishAddon[]
  specialNotes?: string
  itemTotalPrice: number
}

export interface DeliveryAddress {
  name: string
  phone: string
  street: string
  area: string
  city: string
  pinCode: string
  landmark?: string
  label: 'Home' | 'Work' | 'Other'
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod'

export interface Order {
  id: string
  date: string
  timeStr: string
  items: CartItem[]
  subtotal: number
  marketSubtotal: number
  discount: number
  couponCode?: string
  deliveryFee: number
  packagingFee: number
  platformFee: number
  taxes: number
  tip: number
  total: number
  savedCalories: number
  savedMoney: number
  status: 'confirmed' | 'cooking' | 'delivering' | 'at_door' | 'delivered' | 'cancelled'
  acknowledged?: boolean
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  deliveryPartner: {
    name: string
    phone: string
    rating: number
    vehicle: string
  }
  estimatedTimeMin: number
}

export interface Coupon {
  code: string
  title: string
  description: string
  discountType: 'percent' | 'flat' | 'free_delivery'
  discountValue: number
  minOrder: number
  maxDiscount?: number
}

export interface Review {
  id: string
  author: string
  location: string
  rating: number
  date: string
  comment: string
  dishOrdered: string
  avatar: string
}
