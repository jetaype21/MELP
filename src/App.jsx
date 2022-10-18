import './App.css'

// import all componts and libraries
import useData from './hooks/useData'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './pages/header/Header';
import Home from './pages/home/Home';
import RestaurantInfo from './pages/restaurantInfo/RestaurantInfo';

function App() {

  // get info of all restaurants
  const { restaurants } = useData()

  return (
    <div className="App">
      {/* Create routes of the app */}
      <BrowserRouter>

      {/* component permanent all app */}
        <Header />

        {/* routes dinamics of the app */}
        <Routes>
          <Route path='/' element={< Home restaurants={restaurants}/>} />
          {restaurants.map((restaurant) => (
            < Route path={':id'} element={< RestaurantInfo restaurants={restaurants} />} key={restaurant.id} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
