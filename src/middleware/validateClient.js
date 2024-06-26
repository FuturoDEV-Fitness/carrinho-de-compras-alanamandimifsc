const clientSchema = require('../validations/clientSchema');

const validateClient = async (req, res, next) => {
    try {
        await clientSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Validação falhou',
            errors: error.errors,
        });
    }
};
module.exports = validateClient;