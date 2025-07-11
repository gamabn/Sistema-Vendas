import { Cliente } from "@/app/models/Clientes";
import { useFormik } from "formik";
import { Input, InputCpf, InputDate, InputTelefone } from '@/components/Input';
import { validationSchema } from "../validacaoSchema";


interface ClientFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

// Esta função pode ser movida para fora do componente para evitar recriação a cada render.
const toUpperCase = (value: string) => {
    return value ? value.toUpperCase() : '';
}

const formSchema = {
    id: '',
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    email: '',
    telefone: '',
    data_cadastro: '',
}



// O schema inicial para o formulário
export const ClienteForm: React.FC<ClientFormProps> = ({ cliente, onSubmit }) => {
    const formik = useFormik({
        initialValues: {...formSchema, ...cliente },
        onSubmit, // Simplificado: passa a função onSubmit diretamente
        enableReinitialize: true, // Mantém o formulário sincronizado com a prop 'cliente'
        validationSchema: validationSchema,
    })
    console.log("CXlient : ", cliente)
    console.log("Formik : ", formik)

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id && (
                <div className="columns">
                    <Input
                        id="id"
                        name="id" 
                        label="Codigo: *"
                        columnClass="is-half"
                        disabled
                        autoComplete="off"
                        {...formik.getFieldProps('id')}
                    />

                    <Input
                        id="cadastro"
                        name="data_cadastro" 
                        label="Data de Cadastro: *"
                        columnClass="is-half"
                        autoComplete="off"
                        {...formik.getFieldProps('data_cadastro')}
                        disabled
                    />
                </div>
            )}

            <div className="columns">
                 <Input
                    id="nome"
                    name="nome"
                    label="Nome: *"
                    columnClass="is-full"
                    autoComplete="off"
                    formatter={toUpperCase}
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    error={formik.touched.nome && formik.errors.nome ? formik.errors.nome : ''}
                />
          </div>

            <div className="columns">
                <InputCpf
                    id="cpf"
                    label="CPF: *"
                    columnClass="is-half"
                    autoComplete="off"
                    {...formik.getFieldProps('cpf')}
                    error={formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : ''}
                />

                <InputDate
                    id="dataNascimento"
                    label="Data de Nascimento: *"
                    columnClass="is-half"
                    autoComplete="off"
                    {...formik.getFieldProps('dataNascimento')}
                    error={formik.touched.dataNascimento && formik.errors.dataNascimento ? formik.errors.dataNascimento : ''}
                />
            </div>

            <div className="columns">
                <Input
                    id="endereco"
                    label="Endereço: *"
                    columnClass="is-full"
                    autoComplete="off"
                    {...formik.getFieldProps('endereco')}
                    error={formik.touched.endereco && formik.errors.endereco ? formik.errors.endereco : ''}
                />
            </div>

            <div className="columns">
                <Input
                    id="email"
                    label="Email: *"
                    columnClass="is-half"
                    autoComplete="off"
                    {...formik.getFieldProps('email')}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                />

                <InputTelefone
                    id="telefone"
                    label="Telefone: *"
                    columnClass="is-half"
                    autoComplete="off"
                    {...formik.getFieldProps('telefone')}
                    error={formik.touched.telefone && formik.errors.telefone ? formik.errors.telefone : ''}
                />
            </div>

            <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">
                            {formik.values.id ? 'Atualizar' : 'Salvar'}
                        </button>
                    </div>
                </div>
        </form>
    );
};
