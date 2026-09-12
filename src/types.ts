export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon: string;
  created_at: string;
};

export type Item = {
  id: string;
  category_id: string | null;
  seller_id?: string | number;
  seller?: Seller;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  gallery: string[];
  features: string[];
  rating: number;
  reviews_count: number;
  tag: string;
  created_at: string;
};

export type Service = {
  id: string;
  category_id: string | null;
  seller_id?: string | number;
  seller?: Seller;
  service_name: string;
  name?: string; // fallback alias for backward compatibility
  slug: string;
  description: string;
  price: number;
  duration_days: number;
  duration?: string; // formatted duration string helper
  main_image: string;
  image_url?: string; // fallback alias for cover photo
  images?: string[]; // array of secondary gallery photo URLs
  gallery?: string[]; // fallback alias for images
  delivery: boolean; // boolean flag for delivery included / available
  is_active: boolean; // flag indicating if service is active/offered
  features: string[];
  rating: number;
  reviews_count: number;
  tag: string;
  location?: string;
  created_at: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  video_url?: string;
  instructor: string;
  level: string;
  duration: string;
  price: number;
  seats_total: number;
  seats_left: number;
  curriculum: string[];
  highlights: string[];
  created_at: string;
};

export type Registration = {
  id: string;
  course_id: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

export type Seller = {
  id: string | number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  telegram?: string;
  general_location: string;
  profile_picture?: string | null;
  description?: string | null;
  verification_token?: string | null;
  verified: boolean;
};
