import { Produto } from "@/app/models/produtos"
import { useState } from "react"



interface ProdutoRowProps {
    produto: Produto;
     onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}
interface ProdutosProps {
    produtos: Produto[];
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;  
   
}

export const TabelaProduto:React.FC<ProdutosProps> = (
  {produtos, onEdit, onDelete,}: ProdutosProps) => {
    return(
        <table className="table is-striped is-fullwidth is-hoverable">
            <thead>
              <tr>
                  <th>Codigo</th>
                  <th>SKU</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th></th>
                  </tr>
          </thead>
          <tbody>
          {produtos.map(produto => <ProdutoRow onEdit={onEdit} onDelete={onDelete} key={produto.id} produto={produto}/>)}
          </tbody>
         
        </table>
    )
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({produto, onEdit, onDelete}) =>{
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

}
