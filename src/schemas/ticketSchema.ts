import joi from "joi";

export default joi.object({
  body: {
    type: joi.number().valid(1, 2, 3).required(),
    user: joi.number().required()   
  }
});
