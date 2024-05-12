import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import AuthLayout from 'src/layouts/authentication';
import AuthContextProvider from 'src/contexts/AuthContext';
import UserListingContextProvider from 'src/contexts/UserListingContext';
import WebsiteListingContextProvider from 'src/contexts/WebsiteListingContext';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const WebsitePage = lazy(() => import('src/pages/website'));
export const PageComponent = lazy(() => import('src/pages/pagecomponent'));
export const PageOperation = lazy(() => import('src/pages/pageoperation'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// Authentication layout pages
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes(
    [
      {
        element: (
          <AuthContextProvider>
            <DashboardLayout showHeader={true}>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </AuthContextProvider>
        ),
        children: [
          { element: <IndexPage />, index: true },
          { path: 'user', element: <UserListingContextProvider><UserPage /></UserListingContextProvider> },
          { path: 'website', element: <WebsiteListingContextProvider><WebsitePage /></WebsiteListingContextProvider> },
          { path: '/:domain/pages', element: <PageComponent /> },
          { path: 'blog', element: <BlogPage /> },
        ],
      },
      {
        element: (
          <AuthContextProvider>
            <DashboardLayout showHeader={false}>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </AuthContextProvider>
        ),
        children: [
          { path: '/:domain/page/:operation/:id?', element: <PageOperation /> },
        ],
      },
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
