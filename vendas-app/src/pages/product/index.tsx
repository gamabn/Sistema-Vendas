
import Link from "next/link";
import { Layout } from "@/components";
import { TabelaProduto } from "@/components/tabela";
import { Produto } from "@/app/models/produtos";
import useSWR from "swr";
import { httpClient } from "@/app/http";
import { url } from "inspector";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { Loader } from "@/components/loader";
import Router from "next/router";
import { useProdutoService } from "@/app/services";
import { useState, useEffect } from "react";
import { Alert } from "@/components/message";

interface ListagemProdutosProps {
  produtos: Produto[];
}

//export default  function ListagemProdutos({produtos}: ListagemProdutosProps){
export default  function ListagemProdutos(){
    const service = useProdutoService();
    const [mensagens, setMensagens] = useState<Alert[]>([])
    const [lista, setLista] = useState<Produto[]>([]);
    const produtos: Produto[] = [];
    
    const {data: result, error} = useSWR<AxiosResponse<Produto[]>>("/api/produtos", url => httpClient.get(url));

    useEffect(() => {
        setLista(result?.data || []);

    },[result])

    const editar = (produtos: Produto) =>{
        //console.log('Produto para editar', produtos)
        const url = `/cadastros/produtos?id=${produtos.id}`
        Router.push(url)
        //`
    }

    const excluir = async (produto: Produto) =>{
        if(!produto.id){
            setMensagens([{ texto: "ID do produto inválido", tipo: "warning" }]);
            return;
        }
       try {
            await service.excluir(produto.id);
            setMensagens([{ texto: "Produto excluído com sucesso", tipo: "success" }]);
            //console.log("Produto para excluir", produto.id);
            setLista(lista.filter(p => p.id !== produto.id))
          
        } catch (error: any) {
            console.error("Erro ao excluir produto:", error);
            setMensagens([{ texto: "Erro ao excluir o produto", tipo: "danger" }]);
  }
}

   // console.log('RESPOSTA DA API',result?.data);
   if(!result?.data){
    return (
        <div>
           <Loader show={true} />
        </div>
    )
   }
 
    return(
        <Layout titulo="Listagem de Produtos" mensagens={mensagens}>
            <Link href={"/cadastros/produtos"}>
            <button className="button is-warning">Novo</button>
            </Link>
            <br/>
            <br/>
            
            <h1>Lista de Produtos</h1>
            <div>
               {/*<TabelaProduto produtos={produtos}/>*/}
               <TabelaProduto onEdit={editar} onDelete={excluir} produtos={lista }/>
            </div>
        </Layout>
    )
}

//export const getServerSideProps: GetServerSideProps = async () => {
//  const response: AxiosResponse<Produto[]> = await httpClient.get("/api/produtos");

  //return {
  //  props: {
 //     produtos: response.data,
  //  },
  //};
//};