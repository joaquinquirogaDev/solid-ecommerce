import style from './Header.module.css'
import { Link } from "@solidjs/router"
import { createEffect, createSignal } from 'solid-js'
import { AiOutlineShoppingCart } from 'solid-icons/ai'
import { useCounter } from '../../Provider/Provider'
export default function Header() {
    const { data, setData, favoritos, setFavoritos, cantidad, setCantidad, total, setTotal, count, setCount} = useCounter()
    const [apertura, setApertura] = createSignal(false)
    const [dataFiltrada, setDataFiltrada] = createSignal(cantidad())
    const [categorias, setCategorias] = createSignal([])
    createEffect(() => {
        console.log(cantidad())
        console.log(total());
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
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/productos">Productos</Link>
                </li>
                <li>
                    <Link href="/perfil">Perfil</Link>
                </li>
                <li>
                    <Link href="/categorias">Categorias</Link>
                </li>
                <li>
                    <Link href="/favoritos">Favoritos</Link>
                </li>
            </ul>

            <button onClick={() => setApertura(!apertura())}><AiOutlineShoppingCart /></button>

            <div className={apertura() ? style.apertura : style.aperturaCerrar}>
                <Show when={cantidad()?.length == 0} >
                    <div className={style.error}>
                        Agregue productos al carrito
                    </div>
                </Show>
                <For each={cantidad()}>

                    {(item) => (
                        <div className={style.Imagen}>
                        
                            <img src="" alt="" />
                            <p>{item?.cantidad_a_comprar + 1}</p>
                            <p>{item?.nombre}</p>
                            Precio: <h1 className={item.descuento ? style.tachado : style.nice}>{item.precio}</h1>
                            <h1>{item.descuento ? item.precio - item.descuento : ''}</h1>
                            <button onClick={() => onDeleteProduct(item)}>X</button>
                        </div>
                    )}
                </For>
                <button onClick={() => onDelete()}>Vaciar carrito</button>
                <p>Total: {total()}</p>
            </div>

        </header>
    )
}