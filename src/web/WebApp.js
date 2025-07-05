import React, { Suspense, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'

import '../scss/style.scss'
import ProtectedRoute from '../shared/ProtectedRoute'
import WebLayout from './layout/WebLayout'

// Lazy pages
const Login = React.lazy(() => import('./views/login/Login'))
const Login2 = React.lazy(() => import('./views/login/Login2'))
const Register = React.lazy(() => import('./views/register/Register'))
const RegisterStep2 = React.lazy(() => import('./views/register/RegisterStep2'))
const RegisterVerify = React.lazy(() => import('./views/register/RegisterVerify'))

const Cards = React.lazy(() => import('./views/Cards'))
const Carousel = React.lazy(() => import('./views/Carousels'))
const Navs = React.lazy(() => import('./views/Navs'))
const Collapses = React.lazy(() => import('./views/Collapses'))
const ListGroups = React.lazy(() => import('./views/ListGroups'))
const Tables = React.lazy(() => import('./views/Tables'))
const Tenants = React.lazy(() => import('./views/Tenants'))
const TenantList = React.lazy(() => import('./views/TenantList'))
const PropertyOwners = React.lazy(() => import('./views/PropertyOwners'))
const PropertyOwnerList = React.lazy(() => import('./views/PropertyOwnerList'))
const Properties = React.lazy(() => import('./views/Properties'))
const PropertyList = React.lazy(() => import('./views/PropertyList'))
const PropertyUnits = React.lazy(() => import('./views/PropertyUnits'))
const PropertyUnitList = React.lazy(() => import('./views/PropertyUnitList'))
const LeasesTenancy = React.lazy(() => import('./views/LeasesTenancy'))
const LeasesTenancyList = React.lazy(() => import('./views/LeasesTenancyList'))
const LeasesTenancyTerminated = React.lazy(() => import('./views/LeasesTenancyTerminated'))

const Page404 = React.lazy(() => import('./views/page404/Page404'))
const Page500 = React.lazy(() => import('./views/page500/Page500'))

const WebApp = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)[0]

    if (theme) {
      setColorMode(theme)
    } else if (!isColorModeSet()) {
      setColorMode('light') // Still keep this for async fallback
    }
  }, [isColorModeSet, setColorMode])

  // Immediate override for SSR/deployment bug
  if (!isColorModeSet()) {
    setColorMode('light')
  }

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-5 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/loginstep2" element={<Login2 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/404" element={<Page404 />} />

          {/* Protected routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<WebLayout />}>
                    <Route index element={<Navigate to="/cards" replace />} />
                    <Route path="/registerstep2" element={<RegisterStep2 />} />
                    <Route path="/registerverify" element={<RegisterVerify />} />
                    <Route path="cards" element={<Cards />} />
                    <Route path="carousel" element={<Carousel />} />
                    <Route path="navs" element={<Navs />} />
                    <Route path="collapses" element={<Collapses />} />
                    <Route path="listgroups" element={<ListGroups />} />
                    <Route path="tables" element={<Tables />} />
                    <Route path="tenants" element={<Tenants />} />
                    <Route path="tenantlist" element={<TenantList />} />
                    <Route path="propertyowners" element={<PropertyOwners />} />
                    <Route path="propertyownerlist" element={<PropertyOwnerList />} />
                    <Route path="properties" element={<Properties />} />
                    <Route path="propertylist" element={<PropertyList />} />
                    <Route path="propertyunits" element={<PropertyUnits />} />
                    <Route path="propertyunitlist" element={<PropertyUnitList />} />
                    <Route path="leasestenancy" element={<LeasesTenancy />} />
                    <Route path="leasestenancylist" element={<LeasesTenancyList />} />
                    <Route path="leasestenancyterminated" element={<LeasesTenancyTerminated />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default WebApp
