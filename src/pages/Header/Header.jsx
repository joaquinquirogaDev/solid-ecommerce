import style from './Header.module.css'
import { Link } from "@solidjs/router"
import { createEffect, createSignal } from 'solid-js'
import { AiOutlineShoppingCart } from 'solid-icons/ai'
import { useCounter } from '../../Provider/Provider'
export default function Header() {
    const { data, setData, favoritos, setFavoritos, cantidad, setCantidad, total, setTotal } = useCounter()
    const [apertura, setApertura] = createSignal(false)
    const [dataFiltrada, setDataFiltrada] = createSignal(cantidad())
    const [categorias, setCategorias] = createSignal([])
    createEffect(() => {
        console.log(cantidad())
        function uniqBy(a, key) {
            var seen = {};
            return a.filter(function (item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
            })
        }
        const RemoveDuplicateArray = (array = []) => {
            const b = uniqBy(array, JSON.stringify).filter((e) => e);
            return b
        }
        setCategorias(RemoveDuplicateArray(cantidad()?.map((item) => {
            return item.categoria
        })))

        const addFilter = (value, key = "") => {
            setDataFiltrada((prevState) => {
              return { ...prevState, [key]: value }
            })
          }
        const filtrado = cantidad().filter(e => e.categoria == categorias())
        // filterData()
        console.log(filtrado);
        addFilter(filtrado, categorias())
        console.log(dataFiltrada())
    })
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
                <For each={dataFiltrada()}>

                    {(item) => (
                        <div className={style.Imagen}>
                        
                            <img src="" alt="" />
                            <p>{item?.nombre}</p>
                            <p>{item?.precio}</p>
                        </div>
                    )}
                </For>
                <button onClick={() => setCantidad([])}>Vaciar carrito</button>
                <p>Total: {total()}</p>
            </div>

        </header>
    )
}