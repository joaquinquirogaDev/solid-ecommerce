import { createEffect, createSignal } from 'solid-js';
import style from './Productos.module.css'
import { AiFillHeart } from 'solid-icons/ai'
import { AiOutlineHeart } from 'solid-icons/ai'
import { useCounter } from '../../Provider/Provider';
import { useNavigate } from '@solidjs/router';
export default function Productos() {
    const { data, setData, favoritos, setFavoritos, cantidad, setCantidad, total, setTotal, count, setCount } = useCounter()
    const [nuevo, setNuevo] = createSignal()
    const [busqueda, setBusqueda] = createSignal('')
    const [nuevaData, setNuevaData] = createSignal('')

    const navigate = useNavigate()
    createEffect(() => {
        localStorage.setItem('data', JSON.stringify(data()))
        localStorage.setItem('fav', JSON.stringify(favoritos()))
        localStorage.setItem('cant', JSON.stringify(cantidad()))
        localStorage.setItem('total', JSON.stringify(total()))
        localStorage.setItem('count', JSON.stringify(count()))
        setNuevaData(data())
        console.log(count());
    })
    const handleClick = () => {
        const infoFilter = data().filter((e) => e.categoria == busqueda() || e.nombre == busqueda())
        infoFilter.length == 0 ? undefined : setNuevaData(infoFilter);
    }
    const addCart = elemento => {
        console.log(elemento);
        if (cantidad().find(item => item?.id === elemento?.id)) {
            const productos = cantidad().map(item =>
                item?.id === elemento?.id
                    ? { ...item, cantidad_a_comprar: item?.cantidad_a_comprar + 1 }
                    : item
            )
            // let totalPrice = state.itemsInCarts.reduce((total,item)=>{
            //     return total + item.price * item.quantity;
            //   },0);
            setTotal(total() + (elemento?.precio * elemento?.cantidad_a_comprar))
            setCount(count() + elemento?.cantidad_a_comprar)
            return setCantidad([...productos])
        }

        setTotal(total() + elemento?.precio * elemento?.cantidad_a_comprar)
        setCount(count() + elemento?.cantidad_a_comprar)
        setCantidad([...cantidad(), elemento])
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
                            <button type="button" onClick={() => addCart(elemento)
                            }>
                                Sumar al carrito
                            </button>
                            <br />
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
