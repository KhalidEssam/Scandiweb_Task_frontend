import './App.css';

import CardSet from './components/Cardset'
import Navbar from './components/Navbar'

function App() {

  const cardData = [
    {
      imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Card 1',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      lastUpdated: 'Last updated 3 mins ago'
    },
    {
      imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Card 2',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      lastUpdated: 'Last updated 3 mins ago'
    },
    {
      imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Card 1',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      lastUpdated: 'Last updated 3 mins ago'
    },
    {
      imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Card 2',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      lastUpdated: 'Last updated 3 mins ago'
    },
    {
      imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Card 1',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      lastUpdated: 'Last updated 3 mins ago'
    },
    {
      imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      title: 'Card 2',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      lastUpdated: 'Last updated 3 mins ago'
    },

    // Add more card data as needed
  ];
  return (
    <div className="App">
      <div className='app-container' style={{ maxHeight: '100%' }} >


      <Navbar />

      <CardSet cardData={cardData} />
      </div>
    </div >
  );
}

export default App;
