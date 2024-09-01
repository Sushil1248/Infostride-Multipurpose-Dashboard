// data.ts

export interface NavigationCategory {
  name: string;
  featured: { name: string; href: string }[];
  collection: { name: string; href: string }[];
  categories: { name: string; href: string }[];
  brands: { name: string; href: string }[];
}

export interface Navigation {
  categories: NavigationCategory[];
  pages: { name: string; href: string }[];
}

export interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  oldPrice?: string,
  href: string;
  imageSrc: string;
  imageAlt: string;
  availableColors: { name: string; colorBg: string }[];
}

export interface Collection {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  attribution: string;
}

export interface FooterNavigation {
  products: { name: string; href: string }[];
  customerService: { name: string; href: string }[];
  company: { name: string; href: string }[];
  legal: { name: string; href: string }[];
  bottomLinks: { name: string; href: string }[];
}

export const currencies: string[] = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];

export const navigation: Navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        { name: 'Sleep', href: '#' },
        { name: 'Swimwear', href: '#' },
        { name: 'Underwear', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Underwear', href: '#' },
        { name: 'Accessories', href: '#' },
      ],
      brands: [
        { name: 'Full Nelson', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Significant Other', href: '#' },
      ],
    },
    {
      name: 'Men',
      featured: [
        { name: 'Casual', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Outdoor', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Artwork Tees', href: '#' },
        { name: 'Pants', href: '#' },
        { name: 'Accessories', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Basic Tees', href: '#' },
      ],
      brands: [
        { name: 'Significant Other', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Full Nelson', href: '#' },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

export const offers = [
  { name: 'Download the app', description: 'Get an exclusive $5 off code', href: '#' },
  { name: "Return when you're ready", description: '60 days of free returns', href: '#' },
  { name: 'Sign up for our newsletter', description: '15% off your first order', href: '#' },
];

export const trendingProducts: Product[] = [
  {
    id: 1,
    name: 'Dining',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc: 'assets/ecom/products/product-1.png',
    imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  {
    id: 2,
    name: 'Living',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc: 'assets/ecom/products/Image-living-room.png',
    imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  {
    id: 3,
    name: 'Bedroom',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc: 'assets/ecom/products/bedroom.png',
    imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
];


interface singleProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: string;
  imageSrc?: string;
  status: string;
  actions: string[];
}

export const productsWithOldPrices: singleProduct[] = [
  {
    id: 1,
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: 2500000,
    imageSrc: 'assets/ecom/products/Syltherine.png',
    oldPrice: 3500000,
    discount: "-30%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Leviosa",
    description: "Stylish cafe chair",
    price: 2500000,
    oldPrice: 3500000,
    imageSrc: 'assets/ecom/products/Respira.png',
    discount: "-30%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Lolito",
    description: "Luxury big sofa",
    price: 7000000,
    imageSrc: 'assets/ecom/products/Lolito.png',
    oldPrice: 14000000,
    discount: "-50%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Respira",
    description: "Outdoor bar table and stool",
    price: 500000,
    imageSrc: 'assets/ecom/products/Respira.png',
    oldPrice: 14000000,
    discount: "-50%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Grifo",
    description: "Night lamp",
    price: 1500000,
    imageSrc: 'assets/ecom/products/Grifo.png',
    oldPrice: 3500000,
    discount: "-30%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Muggo",
    description: "Small mug",
    price: 150000,
    imageSrc: 'assets/ecom/products/Muggo.png',
    oldPrice: 3500000,
    discount: "-30%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Pingky",
    description: "Cute bed set",
    price: 7000000,
    imageSrc: 'assets/ecom/products/Pingky.png',
    oldPrice: 14000000,
    discount: "-50%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  },
  {
    id: 2,
    name: "Potty",
    description: "Minimalist flower pot",
    price: 500000,
    oldPrice: 14000000,
    imageSrc: 'assets/ecom/products/Potty.png',
    discount: "-50%",
    status: "New",
    actions: ["Add to cart", "Share", "Compare", "Like"]
  }
];


export const collections: Collection[] = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
    attribution: 'Sarah Peters, New Orleans',
  },
  {
    id: 2,
    quote:
      'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
    attribution: 'Kelly McPherson, Chicago',
  },
  {
    id: 3,
    quote:
      'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
    attribution: 'Chris Paul, Phoenix',
  },
];

export const footerNavigation: FooterNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  legal: [
    { name: 'Terms of Service', href: '#' },
    { name: 'Return Policy', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Shipping Policy', href: '#' },
  ],
  bottomLinks: [
    { name: 'Accessibility', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};
