import Home from './components/Home';
import Play from './components/Play';
import PageNotFound from "./components/404.jsx";
import {Routes, Route, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.scss';
import { useState } from 'react';


function App() {
  const [category, setCategory] = useState();
  
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();
  const handleSubmit = (event) => {    
    navigate('/play');
    event.preventDefault();      
  };

  return (  
    
      <Routes>
        <Route path='/' element={<Home setCategory={setCategory} setTotalQuestions={setTotalQuestions} setDifficulty={setDifficulty} handleSubmit={handleSubmit} />} />
        <Route path='/play' element={<Play category={category} totalQuestions={totalQuestions} difficulty={difficulty} />} />
        <Route key="/PageNotFound" path="*" element={<PageNotFound />}></Route>
      </Routes>
  );
}

export default App;
