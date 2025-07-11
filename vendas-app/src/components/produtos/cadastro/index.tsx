import { Layout } from 'components'
import React, { useState, useEffect } from 'react'
import { Input, InputMoney } from '../../Input'
import { useProdutoService } from '@/app/services'
import { parseRealToCents, formatReal } from '@/app/util/money'
import { Alert, AlertType } from '@/components/message'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parse } from 'path'


const validationSchema = yup.object().shape({
    sku: yup.string().trim().required("O campo SKU é obrigatório."),
    nome: yup.string().trim().required("O campo Nome é obrigatório."),
   preco: yup
  .number()
  .transform((value, originalValue) => {
    if (typeof originalValue === 'string') {
      const cleaned = originalValue
        .replace(/[^\d,.-]/g, '') // remove R$, espaços e outros símbolos
        .replace(/\./g, '')       // remove separador de milhar
        .replace(',', '.');       // troca vírgula decimal por ponto

      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? undefined : parsed;
    }
    return value;
  })
  .required("O campo Preço é obrigatório.")
  .typeError("O Preço deve ser um valor numérico."),
    descricao: yup.string().trim().required("O campo Descrição é obrigatório."),
    quantidade: yup.number()
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string' && originalValue.trim() === '') {
                return undefined;
            }
            return value;
        })
        .required("O campo Quantidade é obrigatório.")
        .typeError("A Quantidade deve ser um valor numérico.")
})

interface FormValidationProps {
    nome: string;
    sku: string;
    preco: string; // Para validação, é uma string
    descricao: string;
    quantidade: string; // Para validação, é uma string
    
}
interface FormErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
    quantidade?: string;
}

interface FormProps {
    nome: string;
    sku: string;
    preco: number;
    descricao: string;
    quantidade: number;
    cadastro?: string;
    id?: number;
}

export const CadastroProdutos: React.FC = () => {
  
    const service = useProdutoService()
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [sku, setSku] = useState('')
    const [descricao, setDescricao] = useState('')
    const [id, setId] = useState<number | undefined>(undefined)
    const [quantidade, setQuantidade] = useState('')
    const [cadastro, setCadastro] = useState<string>('')
    const [mensagens, setMensagens] = useState<Alert[]>([])
    const [erros, setErros] = useState<FormErros>({})
    const router = useRouter();
    const { id: idUrl } = router.query;
    //console.log("ID da URL:", idUrl);

    useEffect(() =>{
        if(!idUrl)return

        console.log("ID da URL:", idUrl); // <- aqui está OK

        const getProduto = async () => {
            try {
               const produtoEncontrado = await service.listar(Number(idUrl));
               setId(produtoEncontrado.id);
               setSku(produtoEncontrado.sku);
               setNome(produtoEncontrado.nome);
               setDescricao(produtoEncontrado.descricao);
               // Passa o valor como string simples. O componente Input cuidará da formatação.
               setPreco(produtoEncontrado.preco?.toString() || '');
               setQuantidade(produtoEncontrado.quantidade?.toString() || '');
               setCadastro(produtoEncontrado.cadastro || '');
               console.log("Produto encontrado:", produtoEncontrado);
            }catch (error) {
                console.error("Erro ao buscar produto:", error);
                setMensagens([{texto: "Ocorreu um erro ao buscar o produto.", tipo: "danger"}])
            }
        }
        getProduto() 
    },[idUrl])

    const setMessages = (texto: string, tipo: AlertType) => {
        setMensagens([{ texto, tipo }])
    }

    async function handleForm() {
        // Objeto para validação com os valores brutos (strings) dos inputs
        const produtoParaValidar: FormValidationProps = {
            nome,
            preco, // Passa a string diretamente para validação
            sku,
            descricao,
            quantidade, // Passa a string diretamente para validação
        }
        console.log("Produto a ser validado/enviado:", produtoParaValidar);

        try {
            await validationSchema.validate(produtoParaValidar, { abortEarly: false })
            console.log("Validação Yup bem-sucedida.");

            // Converte os tipos para o formato esperado pelo serviço APÓS a validação
            const produtoParaSalvar: FormProps = {
                id,
                cadastro,
                nome,
                sku,
                descricao,
                preco: parseRealToCents(preco),
                quantidade: parseInt(quantidade) || 0
            };

            if (id) {
                console.log("Modo: Atualizar produto (ID existe).");
                await service.atualizar(produtoParaSalvar)
                setMessages("Produto atualizado com sucesso", "success")
                setErros({})
            } else {
                const result = await service.salvar(produtoParaSalvar)
                setId(result.id)
                setCadastro(result.cadastro)
                setMessages("Produto cadastrado com sucesso", "success")
                setErros({})
                console.log("Modo: Salvar novo produto. Resultado:", result);
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                //const field = error.path;
                //const message = error.message;
                const yupErrors = error.inner.reduce((acc, err) => {
                    if (err.path) {
                        acc[err.path] = err.message;
                    }
                    return acc;
                    }, {} as Record<string, string>);

                setErros(yupErrors);
                //const yupErrors = error.inner.map(err => ({
                  ////  texto: err.message,
                    //tipo: 'danger' as const,
                   // field: err.path // err.path identifica o campo do erro
               // }));
               // setErros({
                   // [field]: message
               // });
                //setMensagens(yupErrors);
               // console.error("Erros de validação YUP:");
            } else {
                console.error("Erro inesperado ao salvar/atualizar:", error);
                setMessages("Ocorreu um erro ao salvar/atualizar o produto.", "danger")
                // Se o erro for do Axios, você pode tentar acessar error.response.data para mais detalhes
            }
        }
    }

    const caixaAlta = (value: string) =>{
        return value.toUpperCase
   }

    return (

        <Layout titulo="Produtos" mensagens={mensagens}>
            {id &&(
                <div className="columns">
                <Input
                    colunClass='is-half'
                    label='Codigo *'
                    value={id?.toString() || ''}
                    id="inputId"
                    disabled={true}
                    
                />
                 <Input
                    colunClass='is-half'
                    label='Data Cadastro *'
                    value={cadastro}
                    id="inputDataCadastro"
                    disabled={true}
                   

                />
            </div>

            )}
      

            <div className="columns">
                <Input
                    colunClass='is-half'
                    label='SKU *'
                    value={sku}
                    id="inputSku"
                    placeholder='Digite seu produto'     
                    onChange={e=> setSku(e.target.value)}            
                    error={erros.sku}
                />
                 <Input
                    colunClass='is-half'
                    label='Quantidade *'
                    value={quantidade}
                    id="inputQuantidade"
                    placeholder='Digite seu produto'
                    onChange={e => setQuantidade(e.target.value)}
                    error={erros.quantidade}
                />

                </div>
                

                <div className="columns">
                <Input
                    colunClass='is-full'
                    label='Nome *'
                    value={nome}
                    id="inputNome"
                    placeholder='Digite seu produto'
                    onChange={e => setNome(e.target.value)}
                    error={erros.nome}
                />
               
            </div>
            <div className="columns">
               
               
            </div>

            <div className="columns">
                <div className='field column is-full'>
                      <label className='label' htmlFor='inputPreco'>Preço:</label>
                    <div className='control'>                             
                        <input
                            className='input'
                            id='inputPreco'
                            placeholder='Digite o preço do produto'
                            value={preco}
                            onChange={e => setPreco(e.target.value)}
                            onBlur={()=>{
                                const cents  = parseRealToCents(preco)
                                if(cents){
                                    setPreco(formatReal(cents))
                                }else{
                                    setPreco('')
                                }
                            }
                            }

                            maxLength={16}
                            
                            />
                           
                           
                            
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className='field column is-full'>
                    <label className='label' htmlFor='textArea'>Descriçao: *</label>
                    <div className='textArea'>
                        <textarea className="textarea"
                            id='textArea'
                            value={descricao}
                            placeholder="Digite a descriçao detalhada do produto"
                            onChange={(e => setDescricao(e.target.value))}/>
                            {erros.descricao && 
                             <p className="help is-danger">{erros.descricao}</p>}
                            
                    </div>
                </div>
            </div>

            <div className='field'>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type='submit' onClick={handleForm}>
                            {id ? 'Atualizar' : 'Salvar'}
                            </button>
                    </div>
                    <Link href={"/product"} className="control">
                        <button className="button  is-info">Voltar</button>
                    </Link>
                </div>

            </div>
        </Layout>
    )
}
  