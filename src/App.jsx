
import './index.css'
import { Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ItemView from './pages/ItemView';
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './utils/ProtectedRoute';
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/user' element={<UserPage/>}></Route>
        <Route path='/item/:id' element={<ItemView/>}></Route>
        <Route path='/404' element={<ErrorPage/>}></Route>
      </Route>
      
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signUp' element={<SignUpPage/>}></Route>
    </Routes>
  )
}

export default App;

