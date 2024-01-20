import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import CharPage from './components/CharPage';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
      <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/:id" element={<CharPage />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;

//test