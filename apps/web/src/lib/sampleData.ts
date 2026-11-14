import type { Product, Seller, Agent, Creator, Category, Money } from '@/types/index';
import { createMoney } from '@/lib/currency';

const USD = 'USD';
const NGN = 'NGN';

export const DEMONSTRATION_NOTICE = 'Demonstration data — not real platform activity.';

export const DEMO_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Home & Living', slug: 'home-living', image: '/assets/categories/home.svg', productCount: 124 },
  { id: 'cat-2', name: 'Fashion', slug: 'fashion', image: '/assets/categories/fashion.svg', productCount: 210 },
  { id: 'cat-3', name: 'Electronics', slug: 'electronics', image: '/assets/categories/electronics.svg', productCount: 186 },
  { id: 'cat-4', name: 'Food & Grocery', slug: 'food-grocery', image: '/assets/categories/food.svg', productCount: 312 },
  { id: 'cat-5', name: 'Arts & Crafts', slug: 'arts-crafts', image: '/assets/categories/arts.svg', productCount: 98 },
  { id: 'cat-6', name: 'Beauty & Wellness', slug: 'beauty-wellness', image: '/assets/categories/beauty.svg', productCount: 145 },
];

function usd(dollars: number): Money {
  return createMoney(dollars * 100, USD);
}

function ngn(naira: number): Money {
  return createMoney(naira * 100, NGN);
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Handwoven Cotton Throw Blanket',
    description: 'Premium handwoven cotton throw in natural tones. Soft, durable, and made to last.',
    price: usd(48),
    images: ['/assets/products/throw-1.jpg', '/assets/products/throw-2.jpg'],
    category: 'Home & Living',
    sellerId: 'seller-1',
    rating: 4.8,
    reviewCount: 124,
    stock: 36,
    isDemo: true,
  },
  {
    id: 'prod-2',
    title: 'Leather Tote Bag',
    description: 'Full-grain leather tote bag with gold-tone hardware. Designed for everyday elegance.',
    price: usd(128),
    images: ['/assets/products/tote-1.jpg'],
    category: 'Fashion',
    sellerId: 'seller-2',
    rating: 4.9,
    reviewCount: 87,
    stock: 18,
    isDemo: true,
  },
  {
    id: 'prod-3',
    title: 'Ceramic Tea Set',
    description: 'Six-piece artisan ceramic tea set, glazed by hand. Dishwasher and microwave safe.',
    price: usd(64),
    images: ['/assets/products/tea-1.jpg'],
    category: 'Home & Living',
    sellerId: 'seller-3',
    rating: 4.7,
    reviewCount: 53,
    stock: 24,
    isDemo: true,
  },
  {
    id: 'prod-4',
    title: 'Organic Shea Butter',
    description: 'Unrefined organic shea butter sourced directly from women-led cooperatives.',
    price: ngn(3500),
    images: ['/assets/products/shea-1.jpg'],
    category: 'Beauty & Wellness',
    sellerId: 'seller-4',
    rating: 4.9,
    reviewCount: 210,
    stock: 120,
    isDemo: true,
  },
  {
    id: 'prod-5',
    title: 'Beaded Evening Clutch',
    description: 'Hand-beaded clutch for special occasions. Luxury gold lining with magnetic closure.',
    price: usd(92),
    images: ['/assets/products/clutch-1.jpg'],
    category: 'Fashion',
    sellerId: 'seller-2',
    rating: 5.0,
    reviewCount: 41,
    stock: 12,
    isDemo: true,
  },
  {
    id: 'prod-6',
    title: 'Wooden Speaker Stand',
    description: 'Solid walnut speaker stand with cable management. Built for bookshelf speakers.',
    price: usd(110),
    images: ['/assets/products/stand-1.jpg'],
    category: 'Electronics',
    sellerId: 'seller-5',
    rating: 4.6,
    reviewCount: 29,
    stock: 14,
    isDemo: true,
  },
];

export const DEMO_FEATURED_PRODUCTS = DEMO_PRODUCTS.slice(0, 4);
export const DEMO_TRENDING_PRODUCTS = DEMO_PRODUCTS.slice(2, 6);

export const DEMO_SELLERS: Seller[] = [
  {
    id: 'seller-1',
    name: 'Harmony Weavers',
    tagline: 'Handwoven textiles from the heart of Ghana',
    location: 'Accra, Ghana',
    avatar: '/assets/sellers/harmony.jpg',
    rating: 4.9,
    reviewCount: 312,
    joined: '2023-04-12',
    isVerified: true,
    isDemo: true,
  },
  {
    id: 'seller-2',
    name: 'Aurora Leather',
    tagline: 'Full-grain leather goods, made to order',
    location: 'Cape Town, South Africa',
    avatar: '/assets/sellers/aurora.jpg',
    rating: 4.8,
    reviewCount: 198,
    joined: '2023-06-20',
    isVerified: true,
    isDemo: true,
  },
  {
    id: 'seller-3',
    name: 'Clay & Kiln',
    tagline: 'Artisan ceramics for the modern home',
    location: 'Lagos, Nigeria',
    avatar: '/assets/sellers/clay.jpg',
    rating: 4.7,
    reviewCount: 145,
    joined: '2023-08-03',
    isVerified: false,
    isDemo: true,
  },
  {
    id: 'seller-4',
    name: 'Pure Shea Co.',
    tagline: 'Unrefined shea butter and natural skincare',
    location: 'Tamale, Ghana',
    avatar: '/assets/sellers/pure.jpg',
    rating: 4.9,
    reviewCount: 543,
    joined: '2023-02-14',
    isVerified: true,
    isDemo: true,
  },
  {
    id: 'seller-5',
    name: 'Walnut Works',
    tagline: 'Solid wood furniture and accessories',
    location: 'Nairobi, Kenya',
    avatar: '/assets/sellers/walnut.jpg',
    rating: 4.6,
    reviewCount: 87,
    joined: '2023-10-11',
    isVerified: false,
    isDemo: true,
  },
];

export const DEMO_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Amina Diallo',
    specialty: 'West African market entry',
    location: 'Dakar, Senegal',
    avatar: '/assets/agents/amina.jpg',
    commissionRate: 0.08,
    rating: 4.9,
    reviewCount: 67,
    isDemo: true,
  },
  {
    id: 'agent-2',
    name: 'Rajiv Mehta',
    specialty: 'South Asia exports',
    location: 'Mumbai, India',
    avatar: '/assets/agents/rajiv.jpg',
    commissionRate: 0.07,
    rating: 4.8,
    reviewCount: 91,
    isDemo: true,
  },
  {
    id: 'agent-3',
    name: 'Chioma Nkosi',
    specialty: 'Southern Africa distribution',
    location: 'Johannesburg, South Africa',
    avatar: '/assets/agents/chioma.jpg',
    commissionRate: 0.075,
    rating: 4.9,
    reviewCount: 54,
    isDemo: true,
  },
  {
    id: 'agent-4',
    name: 'Luis Ferreira',
    specialty: 'Latin America fulfillment',
    location: 'São Paulo, Brazil',
    avatar: '/assets/agents/luis.jpg',
    commissionRate: 0.085,
    rating: 4.7,
    reviewCount: 73,
    isDemo: true,
  },
];

export const DEMO_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'Zara Mensah',
    handle: '@zarastyle',
    bio: 'Sustainable fashion styling and thrift flips.',
    avatar: '/assets/creators/zara.jpg',
    videoCount: 42,
    followerCount: 124000,
    rating: 4.9,
    isDemo: true,
  },
  {
    id: 'creator-2',
    name: 'Kwame Asante',
    handle: '@kwamecooks',
    bio: 'West African recipes and kitchen essentials.',
    avatar: '/assets/creators/kwame.jpg',
    videoCount: 68,
    followerCount: 210000,
    rating: 5.0,
    isDemo: true,
  },
  {
    id: 'creator-3',
    name: 'Lina Rossi',
    handle: '@linahome',
    bio: 'Ceramics, interiors and slow living.',
    avatar: '/assets/creators/lina.jpg',
    videoCount: 31,
    followerCount: 87000,
    rating: 4.8,
    isDemo: true,
  },
];
