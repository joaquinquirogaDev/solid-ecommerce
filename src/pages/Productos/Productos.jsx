import { createEffect, createSignal } from 'solid-js';
import style from './Productos.module.css'
import { AiFillHeart } from 'solid-icons/ai'
import { AiOutlineHeart } from 'solid-icons/ai'
import { useCounter } from '../../Provider/Provider';
import { useNavigate } from '@solidjs/router';
export default function Productos() {
    const { data, setData, favoritos, setFavoritos } = useCounter()
    const [nuevo, setNuevo] = createSignal()
    const [busqueda, setBusqueda] = createSignal('')
    const [nuevaData, setNuevaData] = createSignal(data())

    const navigate = useNavigate()
    createEffect(() => {
        localStorage.setItem('fav', JSON.stringify(favoritos()))
    })
    const handleClick = () => {
        const infoFilter = data().filter((e) => e.categoria == busqueda() || e.nombre == busqueda())
        setNuevaData(infoFilter);
    }
    return (

        <>
            <div className={style.containerInput}>
                <input placeholder="Ingrese para buscar" value={busqueda()} type="text" onChange={(e) => {
                    setBusqueda(e.target.value)
                }} />
                <button onClick={() => {
                    busqueda() == '' ? setNuevaData(data()) : handleClick()
                }}>Buscar</button>
            </div>
            <div className={style.container}>
                <For each={nuevaData()} fallback={<div>Cargando...</div>}>
                    {(elemento) => (
                        <div className={style.card}>
                            <div className={style.img}>
                                <img src="" alt="" />
                            </div>
                            <h1>{elemento?.nombre}</h1>
                            <div className={style.description}>
                                {elemento?.descripcion}
                            </div>
                            <div className={style.precio}>
                                Precio: <h1 className={elemento.descuento ? style.tachado : style.nice}>{elemento.precio}</h1>
                                <h1>{elemento.descuento ? elemento.precio - elemento.descuento : ''}</h1>
                            </div>
                            <div className={style.Buttons}>
                                <button onClick={() => {
                                    const nuevo1 = favoritos().some((e) => e.id === elemento.id)
                                    setNuevo(nuevo1)
                                    nuevo() ? undefined : setFavoritos([...favoritos(), elemento])
                                }
                                }
                                >
                                    {favoritos().some((e) => e.id === elemento.id) ? <AiFillHeart /> : <AiOutlineHeart />}</button>
                                <button onClick={() => navigate(`/detalles`, { state: { item: elemento } })}>Detalle</button>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </>

    )
}
