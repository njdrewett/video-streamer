import react from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Player from './Player';
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/player/:id" element={<Player/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
    // 
    //   <header className='App-header'>
    //     <video controls>
    //       <source src="http://localhost:4000/video" type="video/mp4"></source>
    //     </video>
    //   </header>
    
    

  );
}

export default App;
