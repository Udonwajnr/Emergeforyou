import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Emergency from './pages/Emergency';
import About from './pages/About';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import AdminDetails from './pages/AdminDetails';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="routers">
        <Routes>
          <Route path='/' element={<Home/>}/ >
          <Route path='/emergency' element={<Emergency/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='admin' element={<ProtectedRoutes/>}>
            <Route index element={<AdminDashboard/>}/>
          <Route path='details/:subject' element={<AdminDetails/>}/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/*' element={<Home/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
