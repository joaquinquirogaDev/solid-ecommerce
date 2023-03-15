import { useNavigate, Link } from "@solidjs/router"
import { createEffect, createMemo, createSignal, useContext } from "solid-js";
import { useCounter } from "../../Provider/Provider";
import style from './Home.module.css'
import {perfil, productos} from '../../data'
export default function Home() {

    const {data, setData} = useCounter();
    const navigate = useNavigate()
    const info = JSON.stringify(localStorage.setItem('data', productos))
    createEffect(() => {
        localStorage.setItem('data', JSON.stringify(productos))
    })
    console.log(data());
    return (
        <div className={style.container}>
           <h1>Bienvenidos al Ecommerce</h1>
        </div>
    )
}
