import { ReactNode } from 'react'
import { Menu } from './menu'
import { Message } from '../message';
import { Alert } from '../message';

interface LayoutProps {
    titulo?: string; 
    children?: ReactNode; 
    mensagens?: Alert[];
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (
        <div className="app">
            <section className="main-content columns is-fullheight">
                <Menu />

                <div className="container column is-10">
                    <div className="section">
                        <div className="card">
                            <div className="card-header">
                                <p className="card-header-title">
                                    {props.mensagens && props.mensagens.map( msg => <Message key={msg.texto} {...msg} />)}
                                    {props.titulo}
                                </p>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}