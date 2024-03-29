import { createSignal } from 'solid-js';
import { perfil, productos } from '../../data.js'
import style from './Perfil.module.css'
import fotoMia from '../../Img/fotoMia.jpg'

export default function Perfil() {
    const [dataPerfil, setDataPerfil] = createSignal(perfil)
    return (
        <div className={style.container}>
            <div className={style.Imagen}>
                <img src={fotoMia} alt="" />
            </div>
            <h1>{dataPerfil()?.nombre + ' ' + dataPerfil()?.apellido}</h1>
            <h3>{dataPerfil()?.email}</h3>
        </div>
    )
}