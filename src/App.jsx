import { lazy, Suspense } from 'solid-js';
import { Router, Route, Routes, Link } from "@solidjs/router"
import Header from './pages/Header/Header';
const Home = lazy(() => import('./pages/Home/Home'))
const Prueba = lazy(() => import('./pages/Prueba/Prueba'))
const Productos = lazy(() => import('./pages/Productos/Productos'))
const Categorias = lazy(() => import('./pages/Categorias/Categorias'))
const Detalles = lazy(() => import('./pages/Detalles/Detalles'))
const Favoritos = lazy(() => import('./pages/Favoritos/Favoritos'))
const Perfil = lazy(() => import('./pages/Perfil/Perfil'))

export default function App() {

  return <>

    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/prueba" component={Prueba} />
          <Route path="/productos" component={Productos} />
          <Route path="/categorias" component={Categorias} />
          <Route path="/detalles" component={Detalles} />
          <Route path="/favoritos" component={Favoritos} />
          <Route path="/perfil" component={Perfil} />

        </Routes>
      </Suspense>

    </Router>

  </>
}
