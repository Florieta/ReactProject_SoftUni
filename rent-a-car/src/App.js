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

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/register-dealer' element={<SignUpDealer />} />
      <Route path='/register-renter' element={<SignUpRenter />} />
      <Route path='/catalog' element={<Catalog />} />
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
 /* <Route path='/' element={<Home />} />*/