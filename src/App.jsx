import logo from './logo.svg';
import styles from './App.module.css';
import { createMemo, createSignal, lazy } from 'solid-js';
import { Router, Route, Routes} from "@solidjs/router"
// import { Routes } from 'solid-app-router';
// import Home from './Components/Home/Home'
const Home = lazy(() => import('./Components/Home/Home'))
export default function App(){

  return (
        
        <Router>
          <Routes>
            <Route path='/' exact component={Home} />
          </Routes>
        </Router>
  )
}
