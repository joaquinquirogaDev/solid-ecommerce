import { createContext, createEffect, createSignal, useContext} from "solid-js";
import { createStore } from "solid-js/store";

const ContextCount = createContext();

export function Provider(props){
    const [data, setData] = createSignal('')
    const [favoritos, setFavoritos] = createSignal([])
    const [cantidad, setCantidad] = createSignal([])
    const [total, setTotal] = createSignal(0)
    const [count, setCount] = createSignal(0)
    createEffect(() => {
      const dataInfo = JSON.parse(localStorage.getItem('data')) || []
      const favorito = JSON.parse(localStorage.getItem('fav')) || []
      const cantidadItem = JSON.parse(localStorage.getItem('cant')) || []
      const totalItem = JSON.parse(localStorage.getItem('total')) || 0
      const countProducts = JSON.parse(localStorage.getItem('count')) || 0
      setData(dataInfo)
      setFavoritos(favorito)
      setCantidad(cantidadItem)
      setTotal(totalItem)
      setCount(countProducts)
    })
    const store = {
      data,
      setData,
      favoritos,
      setFavoritos,
      cantidad,
      setCantidad,
      total,
      setTotal,
      count,
      setCount
    }
    return (
        <ContextCount.Provider value={store}>
          {props.children}
        </ContextCount.Provider>
      );
}  

export const useCounter = () => useContext(ContextCount)
  
