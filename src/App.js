import './App.css';


// import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from './Store/slices/cartToggleSlice.js';
import CardSet from './components/Cardset'
import Navbar from './components/Navbar'
// import Products from '../../data/data.js';

// import { setActiveOption } from './Store/slices/navbarSlice';

import CardData from './data/data.js'
import CartWidget from './components/CartWidgetCard';
function App() {
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const dispatch = useDispatch();



  // const [isToggled, setIsToggled] = useState(false);

  const toggleBackgroundColor = () => {
    dispatch(toggle());
  };


  return (
    <div className={`App`} >
      <Navbar onToggle={toggleBackgroundColor} />
      <CartWidget isToggled={isToggled} />



      <div className='app-container' >
        <div className='h3 d-flex justify-content-start mt-4' style={{ fontFamily: 'Raleway' }}>
          {useSelector((state) => state.navbar.activeOption)}
        </div>

        <div className= { `Cart ${isToggled ? 'toggled' : ''} `}></div>
        <CardSet cardData={CardData}  />
      </div>
      
    </div >
  );
}

export default App;
