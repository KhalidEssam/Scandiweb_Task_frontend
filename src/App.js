import './App.css';

import { useSelector, useDispatch } from 'react-redux';
import { toggle } from './Store/slices/cartToggleSlice.js';
import CardSet from './components/Cardset'
import Navbar from './components/Navbar'

import FetchQuery from './services/FetchQuery.js';

// import { setActiveOption } from './Store/slices/navbarSlice';

import CardData from './data/data.js'
import CartWidget from './components/CartWidgetCard';
function App() {
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);



  // const [isToggled, setIsToggled] = useState(false);

  const toggleBackgroundColor = () => {
    dispatch(toggle());
  };
  const query = `
      {
  categories {
    id
    name
  }
  products {
    id
    name
    inStock
    description
    gallery
    __typename
    category
    __typename
    brand
    __typename
    prices {
      amount
      currency {
        label
        symbol
      }
      __typename
    }
    attributes {
        id
        items {
            id
            displayValue

        }
        __typename
    }
    __typename
  }
}

    `;


  return (
    <div className={`App`} >
      <FetchQuery query={query} />
      {categories && console.log(categories)}

      <Navbar onToggle={toggleBackgroundColor} options={categories} />


      <CartWidget isToggled={isToggled} />



      <div className='app-container' >
        <div className='h3 d-flex justify-content-start mt-4' >
          {useSelector((state) => state.navbar.activeOption)}
        </div>

        <div className={` justify-content-center   Cart ${isToggled ? 'toggled' : ''} `}></div>
        <CardSet cardData={CardData} />
      </div>








      {/* <Products /> */}


    </div >
  );
}

export default App;
