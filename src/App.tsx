import { createBrowserRouter } from 'react-router';

import { Login } from './pages/login';
import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Networks } from './pages/networks';
import { Error } from './pages/error'

import { Private } from './routes/Private'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/admin',
    element: <Private> <Admin/> </Private>
  },
  {
    path: '/admin/social',
    element: <Networks/>
  },
  {
    path: '*',
    element: <Error/>
  }
])


export { router }