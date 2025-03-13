import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  firstname: Joi.string().optional(),
  lastname: Joi.string().optional(),
  _csrf: Joi.string().required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    _csrf: Joi.string().required()
});


