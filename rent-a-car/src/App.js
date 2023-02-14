import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar/Navbar';
import SignIn from './pages/Login/Login';
import SignUpDealer from './pages/Register/RegisterAsDealer';
import SignUpRenter from './pages/Register/RegisterAsRenter';
import Footer from './components/Footer/Footer';
import Catalog from './pages/Catalog/Catalog';
import Home from './pages/Home/Home';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import CarDetails from './pages/CarDetails/CarDetails';
import { AuthProvider } from './context/AuthContext.js';
import MyProfile from './pages/MyProfile/MyProfile';
import PrivateRoute from './components/Common/PrivateRoute.js';
import EditProfileDealer from './pages/EditProfile/EditProfileDealer';
import EditProfileRenter from './pages/EditProfile/EditProfileRenter';
import CreateCar from './pages/Create/CreateCar';
import MyCars from './pages/MyCars/MyCars';
import MyBookings from './pages/MyBookings/MyBookings';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/register-dealer' element={<SignUpDealer />} />
          <Route path='/register-renter' element={<SignUpRenter />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path="/catalog/:carId" element={<CarDetails />} />
          <Route path="/my-profile" element={(
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>)} />
          <Route path="/profile-dealer" element={(
            <PrivateRoute>
              <EditProfileDealer />
            </PrivateRoute>)} />
          <Route path="/profile-renter" element={(
            <PrivateRoute>
              <EditProfileRenter />
            </PrivateRoute>)} />
          <Route path="/create" element={(
            <PrivateRoute>
              <CreateCar />
            </PrivateRoute>)} />
          <Route path="/my-cars" element={(
            <PrivateRoute>
              <MyCars />
            </PrivateRoute>)} />
            <Route path="/my-bookings" element={(
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>)} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
