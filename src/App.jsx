
import './index.css'
import { Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ItemView from './pages/ItemView';
import ErrorPage from './pages/ErrorPage'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/user' element={<UserPage/>}></Route>
      <Route path='/item/:id' element={<ItemView/>}></Route>
      <Route path='/404' element={<ErrorPage/>}></Route>
    </Routes>
  )
}

export default App;

