import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './Component/SignIn/SignIn.tsx'
import SignUp from './Component/SignUp/SignUp.tsx'
import Dashbord from './Component/Dashbord/Dashbord.tsx'
import AddItems from './Component/AddItems/AddItems.tsx'
import UpdateItems from './Component/UpdateItems/UpdateItems.tsx'
import ShowItems from './Component/ShowItems/ShowItems.tsx'
 const routes = createBrowserRouter([
  {path:'/',element:<SignIn/>},
  {path:"/logout",element:<SignUp/>},
  {path:"/Dashbord",element:<Dashbord/>},
  {path:"/Add",element:<AddItems/>},
  {path:"/Update/:id",element:<UpdateItems/>},
  {path:"/Show/:id",element:<ShowItems/>}
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
<RouterProvider router={routes}/>
  </StrictMode>,
)
