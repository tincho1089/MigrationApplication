import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import './App.css'
import { MenuAppBar, RoutesManager } from './components'
import { AuthGuard } from './guards'
import { PrivateRoutes, PublicRoutes } from './models'
import './styles/styles.module.css'
import { RoutesWithNotFound } from './utilities'

const Login = lazy(() => import('./pages/Login/Login'))
const Signin = lazy(() => import('./pages/Signin/Signin'))
const Migrations = lazy(() => import('./pages/Migrations/Migrations'))
const ViewMigration = lazy(() => import('./pages/ViewMigration/ViewMigration'))
const MyAccount = lazy(() => import('./pages/MyAccount/MyAccount'))

function App() {
  return (
    <div className='App'>
      <RoutesManager>
        <MenuAppBar />
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MIGRATIONS}`} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path={PublicRoutes.SIGNIN} element={<Signin />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MIGRATIONS}`} element={<Migrations />} />
            <Route path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEWMIGRATION}`} element={<ViewMigration />} />
            <Route path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYACCOUNT}`} element={<MyAccount />} />

          </Route>
        </RoutesWithNotFound>
      </RoutesManager>
    </div>
  )
}

export default App
