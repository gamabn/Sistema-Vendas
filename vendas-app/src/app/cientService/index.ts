import { httpClient} from "app/http"
import  { Cliente} from "app/models/Clientes"
import { AxiosResponse } from "axios"
import { Page } from "app/models/pageModel"


const resourceUrl: string =  "/api/clientes"

export const useClientService = () => {
    const salvar = async(cliente: Cliente): Promise<Cliente> => {
        const response = await httpClient.post(resourceUrl, cliente)
        return response.data
    }

     const atualizar = async(cliente: Cliente):Promise<void> => {
            const url: string = `${resourceUrl}/${cliente.id}`;
            await httpClient.put(url, cliente);    
        }
        const listar = async(id: number):Promise<Cliente> => {
                const url: string = `${resourceUrl}/${id}`;
                const response: AxiosResponse<Cliente> = await httpClient.get(url);
                return response.data;
            }
        
            const excluir = async(id: number):Promise<void> => {
                const url: string = `${resourceUrl}/${id}`;
                await httpClient.delete(url);
            }
            const find = async(
                nome: string = '', 
                cpf: string = '',
                 page: number = 0,
                  size: number = 8,
                  
                ): Promise<Page<Cliente>> =>{
                    const url = `${resourceUrl}?nome=${nome}&cpf=${cpf}&page=${page}&size=${size}`
                    const response: AxiosResponse<Page<Cliente>> = await httpClient.get(url)
                    return response.data 
                }
                
                
    return{
            salvar,
            atualizar,
            find,
            listar,
            excluir
    }
}


