interface MeessageProps {
    tipo: AlertType; // Usando o tipo AlertType aqui
    field?: string;
    texto: string;
}

export type AlertType = 'success' | 'danger' | 'warning' | 'info'; // Exemplo de definição para AlertType
export interface Alert {
    tipo: AlertType; // Usando o tipo AlertType aqui também
    field?: string;
    texto: string;
}

export const Message:React.FC<MeessageProps> = ({
    tipo, 
    field,
    texto,
})=>{
    return (
        <article className={ `message is-${tipo}`}>
            <div className="message-body">
               {field &&`${field} :`} {texto}

            </div>
        </article>
    )
}