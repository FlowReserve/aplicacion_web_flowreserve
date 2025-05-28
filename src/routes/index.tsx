import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layouts/AppLayout/AppLayout';
import AdminPage from '../pages/AdminPage';
import Landing from '../pages/Landing/Landing';
import Unauthorized from '../pages/Unauthorized';
import Register from '../pages/Register/Register';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  {path: '/unauthorized', element: <Unauthorized/>},
  {
    path: '/',
    element: <AppLayout />,
    children: [
            {
        path: 'register',
        element: (    
            <Register/>
        ),
      },
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
