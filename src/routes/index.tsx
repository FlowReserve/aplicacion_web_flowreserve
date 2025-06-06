import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layouts/AppLayout/AppLayout';
import AdminPage from '../pages/AdminPage';
import Landing from '../pages/Landing/Landing';
import Unauthorized from '../pages/Unauthorized';
import IndexLayout from '../layouts/IndexLayout/IndexLayout';
import Pacientes from '../pages/Pacientes/Pacientes';
import PacienteSolicitudesList from '../pages/PacienteSolicitudesList/PacienteSolicitudesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      { index: true, element: <Landing /> },
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
            <Home />
        ),
      },
      {
        path: 'pacientes',
        element: <Pacientes />,
        children: [
          {
            path: ':id',
            element: <PacienteSolicitudesList />, // ruta dinámica /pacientes/:id
          },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
