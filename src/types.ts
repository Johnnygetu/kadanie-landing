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
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  gallery: string[];
  features: string[];
  duration: string;
  rating: number;
  reviews_count: number;
  tag: string;
  created_at: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
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
