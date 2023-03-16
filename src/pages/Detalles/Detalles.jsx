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
        <>
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.Imagen}>
                    <img src={data()?.img} alt="" />
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
                    <p>Precio:</p><h1 className={data().descuento ? style.tachado : style.nice}>{data().precio}</h1>
                    <h1>{data().descuento ? data().precio - data().descuento : ''}</h1>
                </div>
                <br />
                <div className={style.description}>
                    <button className={style.button2} role="button" onClick={() => navigate(-1)}>Volver</button>
                </div>
                <br />
            </div>
        </div>
        </>

    )
}