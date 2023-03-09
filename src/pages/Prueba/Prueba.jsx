import { createEffect, createSignal, useContext } from "solid-js";
import { useCounter } from "../../Provider/Provider";

export default function Prueba() {
    console.log('hola');

    const {carrito} = useCounter();

    console.log(carrito());
    return (
        <>
            <h1>hola {carrito}</h1>
        </>
    )
}