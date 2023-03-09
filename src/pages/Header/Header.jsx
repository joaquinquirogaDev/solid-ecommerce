import style from './Header.module.css'
import { Link } from "@solidjs/router"
import { createSignal } from 'solid-js'
import { AiOutlineShoppingCart } from 'solid-icons/ai'
export default function Header() {
    const [apertura, setApertura] = createSignal(false)
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

            <button onClick={() => setApertura(!apertura())}><AiOutlineShoppingCart/></button>

                <div className={apertura() ? style.apertura : style.aperturaCerrar}>
                    <ul>
                        <li>Paso uno</li>
                        <li>Paso uno</li>
                        <li>Paso uno</li>
                        <li>Paso uno</li>
                        <li>Paso uno</li>
                    </ul>
                </div>
            
        </header>
    )
}