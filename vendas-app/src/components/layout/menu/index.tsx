import Link from 'next/link'
import {CadastroProdutos} from '../../produtos/cadastro/index'

export const Menu: React.FC = () => {
    return (
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch">
                Minhas Vendas
            </p>
            <ul className="menu-list">
                <MenuItem href="/" label="Home" />
                <MenuItem href="/cadastros/produtos" label="Cadastros" />
                <MenuItem href='/listagemClients' label='Clientes'/>
                <MenuItem href="/product" label="Product" />
                <MenuItem href="/vendas" label="Vendas" />
                <MenuItem href="/" label="Config" />
                <MenuItem href="/" label="Sair" />
            </ul>
        </aside>
       
       
    )
}

interface MenuItemProps {
    href: string;
    label: string;
}
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return (
        <li>
            <Link href={props.href}>
               
                    <span className="icon"></span> { props.label } 
               
            </Link>
        
        </li>
    )
}