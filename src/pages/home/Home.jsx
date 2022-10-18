import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertUrl } from '../../helpers/ConvertNameToUrl';
import './home.css'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

// import material of MUI
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const Home = ({ restaurants }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [like, setLike] = useState(false);

  // array for pagination
  const shortRestaurants = restaurants.slice(currentPage, currentPage + 5)

  // function for button prev
  const prevCurrent = () => {
    if (currentPage === 0) return false
    return setCurrentPage(currentPage - 5)
  }

  // function for button next
  const nextCurrent = () => {
    return setCurrentPage(currentPage + 5)
  }


  return (
    <main className='main'>

      {/* container of filters */}
      <section className='m__left'>
        filtros - No disponible
      </section>

      {/* container of all list on pagination */}
      <section className="m__right">
        <h1>best restaurants</h1>

        {/* list all best restaurnats */}
        <section className='restaurants'>
          {
            shortRestaurants.map((restaurant) => (
              <article key={restaurant.id} className='listRestaurants'>
                <section>
                  <p className='m_name'>
                    <Link
                      to={`/${convertUrl(restaurant.name)}`}
                      key={restaurant.id}>{restaurant.name}
                    </Link>
                    <Box
                      sx={{
                        '& > legend': { mt: 2 },
                      }}
                    >
                      <Rating name="read-only" value={parseInt(restaurant.rating)} readOnly />
                    </Box>
                  </p>

                  <p className='m_address'>{restaurant.address.street} - {restaurant.address.city}</p>
                  <p className='m_state'>{restaurant.address.state}</p>
                </section>

                <section className='lr_right'>
                  {like
                    ? <AiOutlineHeart onClick={() => setLike(!like)} />
                    : <AiFillHeart onClick={() => setLike(!like)} className='activeHeart' />
                  }
                  <Link
                    to={`/${convertUrl(restaurant.name)}`}
                    key={restaurant.id}>
                    Info
                  </Link>
                </section>
              </article>
            ))
          }
        </section>
        <section className='btnGroup'>
          <button className='btn btn__prev' onClick={() => prevCurrent()} disabled={!currentPage} >prev</button>
          <button className='btn btn__next' onClick={() => nextCurrent()} disabled={currentPage >= restaurants.length - 6}>next</button>
        </section>
      </section>
    </main>
  );
}

export default Home;