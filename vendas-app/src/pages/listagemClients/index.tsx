import { useState, useEffect } from "react"
import { Layout } from "@/components"
import { Input,InputCpf } from "@/components/Input"
import { useFormik } from "formik"
import { DataTable, DataTablePageEvent  } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Cliente } from "@/app/models/Clientes"
import { Page } from "@/app/models/pageModel"
import { useClientService } from "@/app/cientService"
import Link from "next/link"
import { Button } from "primereact/button"
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useRouter } from "next/router"


interface ConsultaCientesProps{
    nome?: string;
    cpf?: string;
}


export default function ListagemClients(){
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(false);
    const service = useClientService();
    const [cliente, setCliente] = useState<Page<Cliente>>({
        content: [],
        first:0,
        number: 0,
        size: 8,
        totalElements: 0
    });
   
    const handleSubmit = (filtro: ConsultaCientesProps) => {
        // Ao submeter, busca a primeira página com os novos filtros
        handlePageChange({ page: 0, rows: cliente.size, first: 0 });
    }

    const {
         handleSubmit:formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaCientesProps>({
        initialValues: {
            nome: '',
            cpf: '',
        },
        onSubmit: handleSubmit,
    })

    const handlePageChange = (event: DataTablePageEvent) => {
        setLoading(true);
        service
            .find(filtro.nome, filtro.cpf, event?.page, event?.rows)
            .then(response => setCliente({...response, first: event?.first})).finally(() => setLoading(false));
    }

    const deletarCliente = async(clienteParaDeletar: Cliente) => {
        const response = await service.excluir(Number(clienteParaDeletar.id));
        handlePageChange({ page: 0, rows: cliente.size, first: 0 })

    }

    const actionTemplates = (registro: Cliente) => {
        const handleConfirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
            confirmPopup({
                target: event.currentTarget,
                message: 'Tem certeza que deseja excluir este registro?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                accept: () => deletarCliente(registro),
            });
        };

        return(
            <div style={{display: 'flex', gap: '10px'}}>
                <div>
                     <Button label="Editar" onClick={() => router.push(`/clients?id=${registro.id}`)} className="button is-info p-button-rounded p-button-text" icon="pi pi-pencil" severity="info" rounded />
                </div>
               <div>
                    <Button label="Excluir" onClick={handleConfirmDelete} className="button is-danger p-button-rounded p-button-text" icon="pi pi-trash" severity="danger" />
               </div>
               
            </div>
        )
    }

    return(
    <Layout titulo="Listagem de Clientes">
        <ConfirmPopup />
        <form onSubmit={formikSubmit}>
           <div className="columns">
              <Input
               id="nome"
               name="nome"
               label="Nome: *"
               value={filtro.nome}
               onChange={handleChange}
               columnClass="is-half"/>

              <InputCpf
              id="cpf"
              name="cpf"
              value={filtro.cpf}
              onChange={handleChange}
              label="CPF: *"
               columnClass="is-half"/>
        </div>

         <div>
                <div className="field is-grouped">
                    <div className="control">
                        <button 
                      
                        className="button is-success" type='submit' >
                            Consultar
                        </button>
                    </div>
                    <Link href="/clients">
                        <button className="button is-warning">Novo</button>
                    </Link>
                </div>
           </div>
        </form>
        <br />
        <div className="columns">
            <div className="field column is-full">
                  <DataTable
                   value={cliente.content}
                    totalRecords={cliente.totalElements} 
                    lazy={true}
                    paginator={true}
                    first={cliente.first}
                    onPage={handlePageChange}
                    rows={cliente.size}
                    loading={loading}
                    emptyMessage="Nenhum registro encontrado"
                   >
                <Column field="id" header="Codigo"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="cpf" header="CPF"></Column>
                <Column field="email" header="Email"></Column>
                <Column body={actionTemplates} header="Ações"></Column>
                
            </DataTable>
            </div>
          
        </div>
    </Layout>
              
    )
}