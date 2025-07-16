import { Layout} from "@/components";
import { ClienteForm } from "@/components/form/index"; // Verifique o caminho correto
import { useState, useEffect } from "react";
import { Cliente } from "@/app/models/Clientes";
import { useClientService } from "@/app/cientService";
import { useRouter } from "next/router";
import { Alert } from "@/components/message";

export default function Clients(){
    const service = useClientService();
    const router = useRouter();
    const idUrl = router.query.id;
    const [messages, setMessages] = useState<Alert[]>([]);
     const [cliente, setCliente] = useState<Cliente>({
          id: '',
          nome: '',
          cpf: '',
          dataNascimento: '',
          endereco: '',
          email: '',
         telefone:'', 
         cadastro: '',

    });

    useEffect(() =>{
        if(!idUrl)return;

        const getCliente = async () => {
            try {
                const clienteEncontrado = await service.listar(Number(idUrl));
                setCliente(clienteEncontrado);
                console.log("Cliente encontrado:", clienteEncontrado);
            } catch (error) {
                console.error("Erro ao buscar cliente:", error);
                setMessages([{ texto: "Ocorreu um erro ao buscar o cliente.", tipo: "danger" }]);
            }
        }
        getCliente();
    },[idUrl])

   
  
      //  function convertDateToISO(date: string): string {
           // const [dia, mes, ano] = date.split('/');
         //   return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
         //   }
    
    const handleSubmit = async(submittedCliente: Cliente) => {
        console.log('Final submitted Cliente from Formik:', submittedCliente);
        if(!submittedCliente)return;

          const clienteFormatado = {
            ...submittedCliente,
           // dataNascimento: convertDateToISO(submittedCliente.dataNascimento),
              cpf: (submittedCliente.cpf?? '').replace(/\D/g, ''), 
              telefone: (submittedCliente.telefone?? '').replace(/\D/g, ''), 
        };

         try {
            if(clienteFormatado.id){
                  await service.atualizar(clienteFormatado);
                  setMessages([{
                      texto: "Cliente atualizado com sucesso!",
                      tipo: "success"
                  }]);
            } else {
                  const clienteSalvo = await service.salvar(clienteFormatado);
                  setCliente(clienteSalvo);
                  setMessages([{
                      texto: "Cliente salvo com sucesso!",
                      tipo: "success"
                  }]);
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setMessages(error.response.data.errors.map( (msg: string) => ({ texto: msg, tipo: "danger" })));
            } else {
                setMessages([{ texto: "Ocorreu um erro.", tipo: "danger" }]);
                console.error("Erro desconhecido:", error);
            }
        }
    }; 


    return(
        <Layout titulo="Clientes" mensagens={messages}>
          <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>
        </Layout>
    );
}
