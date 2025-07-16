import { Cliente } from "../Clientes"
import { Produto } from "../produtos";

export interface Venda {
    cliente?: Cliente;
    produtos?: Produto[];
    formaPagamento?: string;
    total?: number;
    
}


