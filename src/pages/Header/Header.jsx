import style from './Header.module.css'
import { Link } from "@solidjs/router"
import { createEffect, createSignal } from 'solid-js'
import { AiOutlineShoppingCart } from 'solid-icons/ai'
import { useCounter } from '../../Provider/Provider'
export default function Header() {
    const { data, setData, favoritos, setFavoritos, cantidad, setCantidad, total, setTotal, count, setCount } = useCounter()
    const [apertura, setApertura] = createSignal(false)
 
    createEffect(() => {
        console.log(cantidad())
    })
    const onDelete = () => {
        setCantidad([])
        setTotal(0)
        setCount(0)
    }
    const onDeleteProduct = elemento => {
        const results = cantidad().filter(
            item => item.id !== elemento.id
        );

        setTotal(total() == 0 ? setTotal(0) : total() - elemento?.precio * elemento?.cantidad_a_comprar);
        setCount(count() == 0 ? setCount(0) : count() - elemento?.cantidad_a_comprar);
        setCantidad(results);
    };
    return (
        <header className={style.header}>
            <ul className={style.UL}>
                <li>
                    <Link style={{ color: 'white' }} href="/">Home</Link>
                </li>
                <li>
                    <Link style={{ color: 'white' }} href="/productos">Productos</Link>
                </li>
                <li>
                    <Link style={{ color: 'white' }} href="/perfil">Perfil</Link>
                </li>
                <li>
                    <Link style={{ color: 'white' }} href="/categorias">Categorias</Link>
                </li>
                <li>
                    <Link style={{ color: 'white' }} href="/favoritos">Favoritos</Link>
                </li>
            </ul>

            <button className={style.button2} onClick={() => setApertura(!apertura())}><AiOutlineShoppingCart /></button>

            <div className={apertura() ? style.apertura : style.aperturaCerrar}>
                <Show when={cantidad()?.length == 0} >
                    <div className={style.error}>
                        Agregue productos al carrito
                    </div>
                </Show>

                <For each={cantidad()}>

                    {(item) => (
                        <>
                            <div className={style.ContainerDatos}>
                                <div className={style.Imagen}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div className={style.cantidad}>
                                    <p>{item?.cantidad_a_comprar + 1}</p>
                                </div>
                                <div className={style.name}>
                                    <p>{item?.nombre}</p>
                                </div>
                                <div className={style.descuento}>
                                    <h1 className={item.descuento ? style.tachado : style.nice}>{item.precio }</h1>
                                    <h1>{item.descuento ? item.precio - item.descuento : ''}</h1>
                                </div>
                                <button className={style.button2} role="button" onClick={() => onDeleteProduct(item)}>X</button>
                            </div>
                        </>
                    )
                    }
                </For>
                <p>Total: {total()}</p>
                {cantidad().length == 0 ? undefined : <button className={style.buttonVaciar} onClick={() => onDelete()}>Vaciar carrito</button>}
            </div>

        </header>
    )
}