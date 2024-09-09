import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// Layouts
import DashboardLayout from 'src/layouts/dashboard';
import AuthLayout from 'src/layouts/authentication';
import EcommerceLayout from 'src/layouts/EcommerceLayout';

// Context Providers
import AuthContextProvider from 'src/contexts/AuthContext';
import UserListingContextProvider from 'src/contexts/UserListingContext';
import WebsiteListingContextProvider from 'src/contexts/WebsiteListingContext';

// Frontend E-commerce Pages
const HomePage = lazy(() => import('src/ecom-store/pages/home'));
const ProductPage = lazy(() => import('src/pages/product'));
const CategoryPage = lazy(() => import('src/pages/category'));
const CartPage = lazy(() => import('src/pages/cart'));
const CheckoutPage = lazy(() => import('src/pages/checkout'));
const BlogPage = lazy(() => import('src/pages/blog'));
const AboutPage = lazy(() => import('src/pages/about'));
const ContactPage = lazy(() => import('src/pages/contact'));

// Backend Admin Pages
const AdminDashboard = lazy(() => import('src/pages/app'));
const UserManagement = lazy(() => import('src/pages/crud'));
const ProductManagement = lazy(() => import('src/pages/admin/products'));
const OrderManagement = lazy(() => import('src/pages/admin/orders'));
const CategoryManagement = lazy(() => import('src/pages/admin/categories'));
const WebsiteSettings = lazy(() => import('src/pages/admin/website-setting'));

// Authentication Pages
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));

// Error Pages
const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function Router() {
  const routes = useRoutes([
    // Frontend E-commerce Routes
    {
      element: (
        <EcommerceLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </EcommerceLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'product/:id', element: <ProductPage /> },
        { path: 'category/:category', element: <CategoryPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
      ],
    },

    // Backend Admin Routes
    {
      path: '/admin/*',
      element: (
        <AuthContextProvider>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthContextProvider>
      ),
      children: [
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'user', element: <UserListingContextProvider><UserManagement /></UserListingContextProvider> },
        { path: 'products', element: <ProductManagement /> },
        { path: 'orders', element: <OrderManagement /> },
        { path: 'categories', element: <CategoryManagement /> },
        { path: 'settings/:element', element: <WebsiteSettings /> },
      ],
    },

    // Authentication Routes
    {
      path: '/auth/*',
      element: (
        <AuthLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AuthLayout>
      ),
      children: [
        { element: <LoginPage />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
      ],
    },

    // Error Routes
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}
