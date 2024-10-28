import logo from './logo.svg';
import { BrowserRouter, Switch, Routes, Route,  Link } from "react-router-dom";
import Home from './components/Mainpage/Mainpage.jsx';
import Node1 from './components//Node1/Node1.jsx';

import './App.css';

function App() {
  return (
    <>
        <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/:farm/:nodeId' element={<Node1></Node1>}/>
        </Routes>
    </>
  );
}

export default App;
