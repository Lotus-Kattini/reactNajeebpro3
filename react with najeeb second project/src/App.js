import './App.css';
import Home from './Pages/Website/Home';
import Login from './Pages/Website/Auth/Login';
import Signup from './Pages/Website/Auth/Signup';
import About from './Pages/Website/About'
import { Routes,Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/Users/Users';
import UpdateUsers from './Pages/Dashboard/Users/UpdateUsers';
import NewUser from './Pages/Dashboard/Users/NewUser';
import './Pages/Website/style.css'
import RequireAuth from './Pages/Website/Auth/RequireAuth';
import PresisLogin from './Pages/Website/Auth/PresisLogin';
import Products from './Pages/Dashboard/Products/Products';
import ApdateProduct from './Pages/Dashboard/Products/UpdateProduct';
import NewProduct from './Pages/Dashboard/Products/NewProduct';


function App() {

  return (
   <>
   <Routes>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    {/* Protected Routes */}
    <Route element={<PresisLogin/>}>
    <Route element={<RequireAuth/>}>
    <Route path='/dashboard' element={<Dashboard/>}>
      <Route exact path='users' element={<Users/>}/>
      <Route path='user/create' element={<NewUser/>}/>
      <Route path='users/:id' element={<UpdateUsers/>}/>
      <Route path='products' element={<Products/>}/>
      <Route path='product/create' element={<NewProduct/>}/>
      <Route path='products/:id' element={<ApdateProduct/>}/>
    </Route>
    </Route>
    </Route>
   </Routes>
   </>
  )
}

export default App;
