import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import AppRouter from './router/AppRouter'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://localhost:3000"

  return (
    <>
     <AppRouter></AppRouter>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default App