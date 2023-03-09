import { createSignal, createEffect } from "solid-js"
import { useCounter } from "../../Provider/Provider"
import style from './Categorias.module.css'
import { AiFillHeart } from 'solid-icons/ai'
import { AiOutlineHeart } from 'solid-icons/ai'
export default function Categorias() {
    const { data, setData, favoritos, setFavoritos} = useCounter()
    const [dataInfo, setDataInfo] = createSignal(data)
    const [categorias, setCategorias] = createSignal()
    const [itemCategoria, setItemCategoria] = createSignal('Todos')
    const [itemsFiltrados, setItemFiltrados] = createSignal([])
    createEffect(() => {
        setDataInfo(data)
        console.log(data());
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
        setCategorias(RemoveDuplicateArray(data()?.map((item) => {
            return item.categoria
        })))
        const filterData = () => {
            const categoriasItems = categorias().map(e => e)
            const map = data().filter((e) => e.categoria == itemCategoria())
            setItemFiltrados(map)
            return map
        }
        filterData()
    })




    return (
        <div className={style.container}>
            <button type="button" value="Todos" onClick={(e) => setItemCategoria(e.target.value)}>Todos</button>
            <For each={categorias()} fallback={<div>Cargando...</div>}>
                {(elemento) => (
                    <ul>
                        <button type="button" value={elemento} onClick={(e) => setItemCategoria(e.target.value)}>{elemento}</button>
                    </ul>
                )}
            </For>
            <For each={itemCategoria() == 'Todos' ? data() : itemsFiltrados()}>
                {(elemento) => (
                    <div className={style.card}>
                        <div className={style.img}>
                            <img src="" alt="" />
                        </div>
                        <h1>{elemento?.nombre}</h1>
                        <div className={style.description}>
                            {elemento?.descripcion}
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
    )
}