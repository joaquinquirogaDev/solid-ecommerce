import { useLocation, useNavigate } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import style from './Detalles.module.css'
export default function Detalles() {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location);
    const [data, setData] = createSignal('')
    createEffect(() => {
        setData(location?.state?.item)
        console.log(data());
    })
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.img}>
                    <img src="" alt="" />
                </div>
                <h1>{data()?.nombre}</h1>
                <h2>Marca: {data().marca}</h2>
                <div className={style.description}>
                    {data()?.descripcion}
                </div>
                <div className={style.description}>
                    Categoria: {data()?.categoria}
                </div>
                <div className={style.description}>
                    Descripcion: {data()?.descripcion}
                </div>
                <div className={style.description}>
                    Precio: <h1 className={data().descuento ? style.tachado : style.nice}>{data().precio}</h1>
                    <h1>{data().descuento ? data().precio - data().descuento : ''}</h1>
                </div>
                <div className={style.description}>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
            </div>
        </div>
    )
}