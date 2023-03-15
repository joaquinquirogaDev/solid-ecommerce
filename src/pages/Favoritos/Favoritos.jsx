import { createSignal, Show } from 'solid-js';
import style from './Favoritos.module.css'
import { AiFillHeart } from 'solid-icons/ai'
import { useCounter } from '../../Provider/Provider';
import { AiFillDelete } from 'solid-icons/ai'
import { useNavigate } from '@solidjs/router';
export default function Favoritos() {
    const { data, setData, favoritos, setFavoritos } = useCounter()
    const navigate = useNavigate()
    console.log(favoritos());
    return (
        <>
            <Show when={favoritos().length == 0} >
                <div className={style.error}>
                    Agregue productos a favoritos
                    <button className={style.button2} role="button" onClick={() => navigate('/productos')}>IR A PRODUCTOS</button>
                </div>
            </Show>
            <div className={style.container}>
                <For each={favoritos()}>
                    {(elemento) => (
                        <div className={style.card}>
                            <div className={style.Imagen}>
                                <img src={elemento.img} alt="" />
                            </div>
                            <h1>{elemento?.nombre}</h1>
                            <div className={style.description}>
                                {elemento?.descripcion}
                            </div>
                            <div className={style.Buttons}>
                                <button className={style.button2} role="button" onClick={() => {
                                    const nuevos = favoritos().filter((i) => i.id != elemento.id)
                                    setFavoritos(nuevos)
                                    localStorage.setItem('fav', favoritos())
                                }}><AiFillDelete /></button>
                                <button className={style.button2} role="button" onClick={() => navigate(`/detalles`, { state: { item: elemento } })}>Detalle</button>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </>

    )
}