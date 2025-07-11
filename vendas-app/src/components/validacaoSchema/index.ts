import * as yup from 'yup';
const validation = "Campo obrigatorio";
const campoObrigatorioValidation = yup.string().required(validation);


export const validationSchema = yup.object().shape({
    nome: yup.string().required(validation),
    cpf: yup.string().trim().required(validation).length(14,'CPF inválido!'),
    dataNascimento:campoObrigatorioValidation,
    endereco: yup.string().required(validation),
    email: yup.string().trim().email('Email inválido').required(validation),
    telefone: campoObrigatorioValidation,

})