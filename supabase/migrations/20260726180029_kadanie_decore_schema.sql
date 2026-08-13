/*
# Kadanie Decore — Core Schema

## Overview
Creates the data model for a decoration services & items platform:
- Categories (e.g. Wedding, Birthday, Corporate, Home, Festival)
- Items (decoration products for sale, each in a category)
- Services (decoration service packages, each in a category)
- Courses (decoration training courses users can register for)
- Registrations (a user signing up for a course)

Single-tenant, no-auth app: the public site reads listings and submits
course registrations anonymously. All policies allow anon + authenticated.

## New Tables
1. categories — id, name, slug, description, image_url, icon, created_at
2. items — id, category_id, name, slug, description, price, image_url,
   gallery (text[]), features (text[]), rating, reviews_count, tag, created_at
3. services — id, category_id, name, slug, description, price, image_url,
   gallery (text[]), features (text[]), duration, rating, reviews_count, tag, created_at
4. courses — id, title, slug, description, image_url, instructor, level,
   duration, price, seats_total, seats_left, curriculum (text[]), highlights (text[]),
   created_at
5. registrations — id, course_id, full_name, email, phone, message, created_at

## Security
- RLS enabled on every table.
- categories/items/services/courses: public read (anon, authenticated), no writes from anon.
- registrations: public insert (anon, authenticated) so visitors can sign up;
  no public read/update/delete to protect submitted personal data.
*/

-- ---------- categories ----------
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Sparkles',
  created_at timestamptz DEFAULT now()
);

-- ---------- items ----------
CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  gallery text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  rating numeric(2,1) NOT NULL DEFAULT 4.8,
  reviews_count int NOT NULL DEFAULT 0,
  tag text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- ---------- services ----------
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  gallery text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  duration text NOT NULL DEFAULT '',
  rating numeric(2,1) NOT NULL DEFAULT 4.9,
  reviews_count int NOT NULL DEFAULT 0,
  tag text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- ---------- courses ----------
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  instructor text NOT NULL DEFAULT '',
  level text NOT NULL DEFAULT 'Beginner',
  duration text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  seats_total int NOT NULL DEFAULT 20,
  seats_left int NOT NULL DEFAULT 20,
  curriculum text[] NOT NULL DEFAULT '{}',
  highlights text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- ---------- registrations ----------
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- ---------- indexes ----------
CREATE INDEX IF NOT EXISTS items_category_id_idx ON items(category_id);
CREATE INDEX IF NOT EXISTS items_slug_idx ON items(slug);
CREATE INDEX IF NOT EXISTS services_category_id_idx ON services(category_id);
CREATE INDEX IF NOT EXISTS services_slug_idx ON services(slug);
CREATE INDEX IF NOT EXISTS courses_slug_idx ON courses(slug);
CREATE INDEX IF NOT EXISTS registrations_course_id_idx ON registrations(course_id);

-- ---------- RLS ----------
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- categories: public read
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- items: public read
DROP POLICY IF EXISTS "public_read_items" ON items;
CREATE POLICY "public_read_items" ON items FOR SELECT
  TO anon, authenticated USING (true);

-- services: public read
DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT
  TO anon, authenticated USING (true);

-- courses: public read
DROP POLICY IF EXISTS "public_read_courses" ON courses;
CREATE POLICY "public_read_courses" ON courses FOR SELECT
  TO anon, authenticated USING (true);

-- registrations: public insert (visitors sign up), no public read
DROP POLICY IF EXISTS "public_insert_registrations" ON registrations;
CREATE POLICY "public_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
