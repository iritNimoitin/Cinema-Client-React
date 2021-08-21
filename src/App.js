
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './Components/Layout';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        {/* <Users /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
