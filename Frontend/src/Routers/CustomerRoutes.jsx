import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customers/pages/Home/HomePage'
import Navbar from '../customers/components/Navbar/Navbar'
import Footer from '../customers/components/Footer/Footer'
import Cart from '../customers/pages/Cart/Cart'
import Profile from '../customers/pages/Profile/Profile'
import PaymentSuccess from '../customers/pages/PaymentSuccess/PaymentSuccess'
import Search from '../customers/components/Search/Search'
import CreateRestaurantForm from '../Admin/AddRestaurants/CreateRestaurantForm'
import Restaurant from '../customers/pages/Restaurant/Restaurant'
import PasswordChangeSuccess from '../customers/pages/Auth/PasswordChangeSuccess'
import MapTravel from '../customers/pages/MapTravel/MapTravel'
import NotFound from '../customers/pages/NotFound/NotFound'


const CustomerRoutes = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <main className='flex-grow pt-16'>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/account/:register' element={<HomePage />} />
          <Route exact path='/restaurant/:city/:title/:id' element={<Restaurant />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment/success/:id' element={<PaymentSuccess />} />
          <Route path='/my-profile/*' element={<Profile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/map-travel' element={<MapTravel />} />
          <Route path='/admin/add-restaurant' element={<CreateRestaurantForm />} />
          <Route exact path='/password_change_success' element={<PasswordChangeSuccess />} />
          <Route exact path='/*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default CustomerRoutes