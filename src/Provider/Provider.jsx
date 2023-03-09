import { createContext, createEffect, createSignal, useContext} from "solid-js";
import { createStore } from "solid-js/store";

const ContextCount = createContext();

export function Provider(props){
    const [data, setData] = createSignal('')
    const [favoritos, setFavoritos] = createSignal([])
    createEffect(() => {
      const dataInfo = JSON.parse(localStorage.getItem('data')) || []
      const favorito = JSON.parse(localStorage.getItem('fav')) || []
      setData(dataInfo)
      setFavoritos(favorito)
    })
    const store = {
      data,
      setData,
      favoritos,
      setFavoritos
    }
    return (
        <ContextCount.Provider value={store}>
          {props.children}
        </ContextCount.Provider>
      );
}  

export const useCounter = () => useContext(ContextCount)
  
