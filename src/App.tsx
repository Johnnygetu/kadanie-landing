import { useRoute } from '@/lib/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CategoriesPage from '@/pages/CategoriesPage';
import CategoryDetailPage from '@/pages/CategoryDetailPage';
import ItemsPage from '@/pages/ItemsPage';
import ItemDetailPage from '@/pages/ItemDetailPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import AboutPage from '@/pages/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  const route = useRoute();
  const path = route.path;

  let page: React.ReactNode;
  if (path === '/') page = <HomePage />;
  else if (path === '/categories') page = <CategoriesPage />;
  else if (path.startsWith('/categories/')) page = <CategoryDetailPage slug={path.split('/')[2]} />;
  else if (path === '/items') page = <ItemsPage />;
  else if (path.startsWith('/items/')) page = <ItemDetailPage slug={path.split('/')[2]} />;
  else if (path === '/services') page = <ServicesPage />;
  else if (path.startsWith('/services/')) page = <ServiceDetailPage slug={path.split('/')[2]} />;
  else if (path === '/courses') page = <CoursesPage />;
  else if (path.startsWith('/courses/')) page = <CourseDetailPage slug={path.split('/')[2]} />;
  else if (path === '/about') page = <AboutPage />;
  else page = <NotFoundPage />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  );
}
