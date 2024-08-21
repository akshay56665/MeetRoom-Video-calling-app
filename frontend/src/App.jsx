import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import CallPage from './components/CallRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Home/>}></Route>
        <Route path="/room/:roomid" element={<CallPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
