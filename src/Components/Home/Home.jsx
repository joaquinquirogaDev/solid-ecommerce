import { createEffect, createSignal, useContext } from "solid-js";
import { useCounter } from "../../Provider/Provider";

export default function Home(){
    console.log('hola');

    const [count, { increment, decrement }, data, setData] = useCounter();

    console.log(count());
    console.log(data());

    createEffect(() => {
        data()
        console.log(data());
    })
return (
    <>
     <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
 
    <input type="text" placeholder="cambiar nombre" onChange={(e) => setData({name: e.target.value || data().name, edad: '30'})}/>
    {data()?.name}
    {data()?.edad}
    </>
)
}
