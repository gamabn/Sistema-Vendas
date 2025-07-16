import { Cliente } from "@/app/models/Clientes";
import { Venda } from "@/app/models/vendasModel"
import { useFormik } from "formik"
import { AutoComplete,AutoCompleteChangeEvent, AutoCompleteCompleteEvent} from 'primereact/autocomplete';
import {  useState } from "react";
import { Page } from "@/app/models/pageModel";
import { useClientService } from "@/app/cientService";
import { useProdutoService } from "@/app/services";
import { Button } from "primereact/button";
import { InputText} from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Produto } from "@/app/models/produtos";
import { Dialog } from "primereact/dialog";

interface VendasFormProps {
    onSubmit: (venda: Venda) => void;
}

const formikSchema: Venda = {
    cliente: { } as Cliente,
    produtos: [],
    total: 0,
    formaPagamento: ''

}

export const VendasForm: React.FC<VendasFormProps> = ({onSubmit}) =>{
    const service = useClientService();
    const produtoService = useProdutoService();
    const [produto, setProduto] = useState<Produto | null>(null)
    const [codigoProduto, setCodigoProduto] = useState<string>('')
    const [mensagem, setMensagem] = useState<string | null>(null)
    const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        totalElements: 0, 
        size: 0
      
    });

    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formikSchema,
    })

    const handleClienteAutoComplete = async(e: AutoCompleteCompleteEvent) =>{
        const nome = e.query;
      //  service.find(nome,'', 0,8).then(response => setListaClientes(response))
      const response = await service.find(nome, '', 0,8)
      setListaClientes(response)
    }

    const handleAutoComplete = async(e: AutoCompleteChangeEvent) =>{
        const clienteSelecionado = e.value as Cliente;
        formik.setFieldValue('cliente', clienteSelecionado);
    }
    const handleCodigoProduto = async(event) =>{
        if(!codigoProduto) return;
        
       produtoService.listar(codigoProduto).then(response => setProduto(response))
       .catch(error => {
        setMensagem("Produto não encontrado")
       })
    }
    const handleAddProduto = () =>{
        console.log('Produto adicionado a venda:',produto)
        const produtoVenda = formik.values.produtos
        produtoVenda?.push(produto);
        setProduto(null);
        setCodigoProduto('');
        formik.setFieldValue('produtos', produtoVenda);
    }

    const handleFecharMensagem = () =>{
        setMensagem(null)
        setCodigoProduto('')
        setProduto(null)
    }


    const dialogMensagemFooter = () => {
        return(
            <Button
            onClick={handleFecharMensagem}
            className="p-button-text"
              label="Ok"/>
        )
    }

    return(
        <form onSubmit={formik.handleSubmit}>
              <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="cliente">Cliente: *</label>
                    <AutoComplete 
                    suggestions={listaClientes.content} 
                    completeMethod={handleClienteAutoComplete} 
                    id="cliente" 
                    field="nome"
                    name="cliente" 
                    value={formik.values.cliente}
                   // onChange={(e: AutoCompleteChangeEvent)=>{
                    //    formik.setFieldValue('cliente', e.value);
                   // }}
                    onChange={handleAutoComplete}/>
                </div>

                {/* Usando justify-content-between para distribuir o espaço */}
                <div className="grid p-fluid justify-content-between" style={{marginTop: '1rem'}}>
                    <div className="col-3">
                        <div className="p-field"> 
                            <FloatLabel>
                                <InputText 
                                    id="produto" 
                                    onBlur={handleCodigoProduto}
                                    value={codigoProduto}
                                    onChange={e => setCodigoProduto(e.target.value)}
                                />
                                <label htmlFor="produto">Código: *</label> 
                            </FloatLabel>
                        </div>
                    </div>

                    <div className="col-4"> {/* Ajustado para col-4 */}
                        <div className="p-field"> {/* Mantendo o p-field para consistência */}                       
                              <AutoComplete
                              value={produto}
                              field="nome"/>                                                                        
                       </div>
                 </div>

                  <div className="col-2">
                         <div className="p-field"> 
                            <FloatLabel>
                                <InputText 
                                    id="qtdProduto"  />
                                <label htmlFor="qtdproduto">QTD: *</label> 
                            </FloatLabel>
                        </div>
                    </div>

                    <div className="col-3"> {/* Ajustado para col-3 */}
                        <div className="p-info">
                          <Button 
                          type="button" 
                          onClick={handleAddProduto}
                          className="button is-warning" 
                          label="Adicionar" 
                          />
                        </div>
                    
                    </div>

                   
               
            </div>  
            <div>
                <div className="p-field">
                    <Button
                  
                    className="button is-success"
                     type="submit"
                      label="Finalizar"/>
            
              </div>
            </div> 
            <Dialog 
            visible={!!mensagem}
            onHide={handleFecharMensagem}
            footer={dialogMensagemFooter}
            header="Atenção!"
            position="top">
                {mensagem}
                </Dialog> 
            </div>                          
        </form>
    )
}