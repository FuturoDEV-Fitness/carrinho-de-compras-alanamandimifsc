const Yup = require('yup');

const clientSchema = Yup.object().shape({
    name: Yup.string()
        .required('O nome é obrigatório')
        .min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: Yup.string()
        .email('E-mail inválido')
        .required('O e-mail é obrigatório'),
    cpf: Yup.string()
        .required('O CPF é obrigatório')
        .matches(/^\d{11}$/, 'CPF inválido'),
    contact: Yup.string()
        .required('O contato é obrigatório')
        .matches(/^\d{11}$/, 'Contato inválido'),
});

module.exports = clientSchema;
