import { Produto } from "@/app/models/produtos"
import { useState } from "react"
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Cliente } from "@/app/models/Clientes";
import Router from "next/router";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';



//interface ProdutoRowProps {
  //  produto: Produto;
  //   onEdit: (produto: Produto) => void;
  //  onDelete: (produto: Produto) => void;
//}
interface ProdutosProps {
    produtos: Produto[];
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;  
   
}

export const TabelaProduto:React.FC<ProdutosProps> = (
  {produtos, onEdit, onDelete,}: ProdutosProps) => {

     const actionTemplates = (registro: Produto) => {
            const handleConfirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
                confirmPopup({
                    target: event.currentTarget,
                    message: 'Tem certeza que deseja excluir este registro?',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Sim',
                    rejectLabel: 'Não',
                    accept: () => onDelete(registro),
                });
            };
    
            return(
                <div style={{display: 'flex', gap: '10px'}}>
                    <div>
                         <Button label="Editar" onClick={() => Router.push(`/cadastros/produtos?id=${registro.id}`)} className="button is-info p-button-rounded p-button-text" icon="pi pi-pencil" severity="info" rounded />
                    </div>
                   <div>
                        <Button label="Excluir" onClick={handleConfirmDelete} className="button is-danger p-button-rounded p-button-text" icon="pi pi-trash" severity="danger" />
                   </div>
                   
                </div>
            )
        }
    
    return(
      <>
      <ConfirmPopup />
      <DataTable value={produtos} paginator={true} rows={10}>
        <Column field="id" header="Codigo"></Column>
        <Column field="sku" header="SKU"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="preco" header="Preço"></Column>
        <Column field="quantidade" header="Quantidade"></Column>
         <Column body={actionTemplates} header="Ações"></Column>
      </DataTable>
      </>
      

    )
      
}

  {/*const ProdutoRow: React.FC<ProdutoRowProps> = ({produto, onEdit, onDelete}) =>{
  const [deletando, setDeletando] = useState(false);

  const onDeleteClick = (produto: Produto) => {
    if(deletando){
      onDelete(produto);
      return;
    }
    setDeletando(true)
  }

  const cancelaDelete = ()=>{
    setDeletando(false)
  }

  

    return(
      <tr>
        <td>{produto.id}</td>
        <td>{produto.sku}</td>
        <td>{produto.nome}</td>
        <td>{produto.preco}</td>
        <td>{produto.quantidade}</td>
        <td>
          {!deletando &&
            
           <button
           onClick={() => onEdit(produto)}
           className="button is-success is-rounded is-small">Editar</button>
          }
          {deletando &&
          <button 
           onClick={cancelaDelete}
           className="button  is-rounded is-small">Cancelar </button>
        }
        </td>
        <td>
           <button 
           onClick={() => onDeleteClick(produto)}
           className="button is-danger is-rounded is-small">{deletando ? "Confirmar" : "Excluir"} </button>
        </td>

        
       
      </tr>
    ) 

}*/}
