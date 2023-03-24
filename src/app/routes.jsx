import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import Dashboard from './Pages/Dashboard/Dashboard';
import PatientForm from './Pages/Patient/PatientForm';
import RegisteredPatients from './Pages/Patient/RegisteredPatients';
import DoctorForm from './Pages/Doctor/DoctorForm';
import RegisteredDoctors from './Pages/Doctor/RegisteredDoctors';
import DoctorDetails from './Pages/Doctor/DoctorDetails';
import AppointmentSchedule from './Pages/Appointment/AppointmentSchedule';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

const routes = [
  {
    element: (
     <AuthGuard>
     
        <MatxLayout />
        
     </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      {
        path: '/patientForm',
        element: <PatientForm />,
        // auth: authRoles.admin
      },

      {
        path: '/registeredPatient',
        element: <RegisteredPatients />,
        // auth: authRoles.admin
      },


      
      {
        path: '/doctorform',
        element: <DoctorForm />,
        // auth: authRoles.admin
      },

      {
        path: '/registeredDoctors',
        element: <RegisteredDoctors />,
        // auth: authRoles.admin
      },

      {
        path: '/registeredDoctors/doctordetails',
        element: <DoctorDetails />,
        // auth: authRoles.admin
      },

      {
        path: '/appointmentSchedule',
        element: <AppointmentSchedule />,
        // auth: authRoles.admin
      },



      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
