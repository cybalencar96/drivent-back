import joi from "joi";

export default joi.object({
  email: joi.string().email().required()
    .messages({
      "string.empty": "\"email\" não pode ser um campo vazio",
      "string.email": "\"e-mail\" deve ser um e-mail válido",
    }),
  password: joi.string().min(6).required()
    .messages({
      "string.empty": "\"senha\" não pode ser um campo vazio",
      "string.min": "O comprimento da \"senha\" deve ter pelo menos 6 caracteres",
    })
});
