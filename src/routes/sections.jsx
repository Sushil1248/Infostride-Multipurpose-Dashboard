import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import AuthLayout from 'src/layouts/authentication';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// Authentication layout pages
export const LoginPage = lazy(() => import('src/pages/login'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes(
    [
      {
        element: (
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ),
        children: [
          { element: <IndexPage />, index: true },
          { path: 'user', element: <UserPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'blog', element: <BlogPage /> },
        ],
      },
      {
        path:'/auth/*',
        element: (
          <AuthLayout>
              <Suspense>
                <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children:[
          { element: <LoginPage />, index: true },
          { path: 'login', element: <LoginPage /> },
        ]
      },
      {
        path: '404',
        element: <Page404 />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ]
  );

  return routes;
}
