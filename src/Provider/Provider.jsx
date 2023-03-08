import { createContext, createSignal, useContext} from "solid-js";
import { createStore } from "solid-js/store";

export const ContextCount = createContext();

export function Provider(props){
    const [count, setCount] = createSignal(props.count ?? 0);
    const [data, setData] = createSignal({name: 'Joaquin', edad: '24'})
    const counter = [
      count,
      {
        increment() {
          setCount((c) => c + 1);
        },
        decrement() {
          setCount((c) => c - 1);
        }
      },
      data,
      setData
    ];
    return (
        <ContextCount.Provider value={counter}>
          {props.children}
        </ContextCount.Provider>
      );
}  

export function useCounter() {
    return useContext(ContextCount);
  }
