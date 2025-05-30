import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layouts/AppLayout/AppLayout';
import AdminPage from '../pages/AdminPage';
import Landing from '../pages/Landing/Landing';
import Unauthorized from '../pages/Unauthorized';
import Register from '../pages/Register/Register';
import IndexLayout from '../layouts/IndexLayout/IndexLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'register', element: <Register /> },
      { path: 'unauthorized', element: <Unauthorized /> },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home />
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
