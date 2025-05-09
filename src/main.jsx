import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './router/router.jsx'
import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'primeicons/primeicons.css';
import { RecoilRoot } from 'recoil'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <>
    <RecoilRoot>
      <Toaster/>
      <RouterProvider router={router} />
      <App />
    </RecoilRoot>
  </>,
)
