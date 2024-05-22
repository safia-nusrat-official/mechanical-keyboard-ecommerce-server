import Joi from "joi"

export const orderValidation = Joi.object({
    email: Joi.string().email().message("Invalid Email").required(),
    productId: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().required()
}).required()