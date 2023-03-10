import { createContext, createEffect, createSignal, useContext} from "solid-js";
import { createStore } from "solid-js/store";

const ContextCount = createContext();

export function Provider(props){
    const [data, setData] = createSignal('')
    const [favoritos, setFavoritos] = createSignal([])
    const [cantidad, setCantidad] = createSignal([])
    const [total, setTotal] = createSignal('')
    createEffect(() => {
      const dataInfo = JSON.parse(localStorage.getItem('data')) || []
      const favorito = JSON.parse(localStorage.getItem('fav')) || []
      const cantidadItem = JSON.parse(localStorage.getItem('cant')) || []
      setData(dataInfo)
      setFavoritos(favorito)
      setCantidad(cantidadItem)
    })
    const store = {
      data,
      setData,
      favoritos,
      setFavoritos,
      cantidad,
      setCantidad,
      total,
      setTotal
    }
    return (
        <ContextCount.Provider value={store}>
          {props.children}
        </ContextCount.Provider>
      );
}  

export const useCounter = () => useContext(ContextCount)
  
