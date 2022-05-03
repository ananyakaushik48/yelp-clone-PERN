import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  
  return (
    <div><Router>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/restaurants/:id/update' element={<UpdatePage/>}/>
    <Route path='/restaurants/:id' element={<RestaurantDetailPage/>}/>
    </Routes>
</Router></div>
  )
}

export default App