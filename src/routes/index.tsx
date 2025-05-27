import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layouts/AppLayout';
import AdminPage from '../pages/AdminPage';
import Landing from '../pages/Landing';
import Unauthorized from '../pages/Unauthorized';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  {path: '/unauthorized', element: <Unauthorized/>},
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
