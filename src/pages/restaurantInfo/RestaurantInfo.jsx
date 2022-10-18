import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { convertUrl } from '../../helpers/ConvertNameToUrl';
import './restaurantInfo.css'
// import icons of react-icons
import { AiFillPhone, AiFillMail } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { GrShare } from 'react-icons/gr'

const RestaurantInfo = ({ restaurants }) => {

  // const data
  const [restaurant, setrestaurant] = useState([]);
  const urlPage = window.location.href
  const copy = useRef()
  let lugares = []
  let { id } = useParams()

  // function for find restaurant 
  const findRestaurant = () => {
    const restaurant = restaurants.filter(res => convertUrl(res.name) === id)
    setrestaurant(restaurant[0])
  }

  // function for get distance in M.
  function getDistanciaMetros(lat1, lon1, lat2, lon2) {
    const rad = function (x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c * 1000;
    return d;
  }


  restaurant.length !== 0 && restaurants.map(res =>
    getDistanciaMetros(restaurant.address.location.lat, restaurant.address.location.lng, res.address.location.lat, res.address.location.lng) < 500
      ? lugares.push({ res })
      : lugares = [...lugares]
  )

  // FUNCTION FOR burron share
  const buttonCompartir = () => {
    navigator.clipboard.writeText(urlPage)
    copy.current.classList.add('active')

    setTimeout(() => {
      copy.current.classList.remove('active')
    }, 2000);
  }

  useEffect(() => {
    findRestaurant()
  }, []);

  return (
    <section className='info_restaurant'>
      {
        restaurant.length === 0
          ? 'cargando'
          : <article>
            <h2>{restaurant.name}</h2>
            <div className='containerInfo'>
              <section className="mapContainer">
                !MAPA NO DISPONIBLE¡ <br />
                lat: {restaurant.address.location.lat} <br />
                lng: {restaurant.address.location.lng}
              </section>
              <section className="redesContainer">
                <span>Redes sociales:</span>
                <ul>
                  <li className='r_icon' ><AiFillPhone /> {restaurant.contact.phone}</li>
                  <li className='r_icon' ><BiWorld /> {restaurant.contact.site}</li>
                  <li className='r_icon' ><AiFillMail /> {restaurant.contact.email}</li>
                </ul>
                <button onClick={() => buttonCompartir()}> Compartir <GrShare /> </button>
                <span className='copy' ref={copy}>Enlace copiado</span>
              </section>
            </div>
            <footer>
              <h4>Lugares cerca</h4>
              {
                lugares.length != 0
                  ? lugares.slice(0, 5).reverse().map(lug => (
                    <Link key={lug.res.id} className={'itemLug'} to={`/${convertUrl(lug.res.name)}`} target='_blank'>
                      {lug.res.name}
                    </Link>
                  ))
                  : <i>No hay lugares cerca</i>
              }
            </footer>
          </article>
      }
    </section >
  );
}

export default RestaurantInfo;
