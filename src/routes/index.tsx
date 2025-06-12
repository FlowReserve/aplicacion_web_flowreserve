import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layouts/AppLayout/AppLayout';
import AdminPage from '../pages/Admin/AdminPage';
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
      // Ruta para listado de pacientes
      { path: 'pacientes', element: <Pacientes /> },

      // Ruta para detalle paciente (hermana a la anterior)
      { path: 'pacientes/:id', element: <PacienteSolicitudesList /> },
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
