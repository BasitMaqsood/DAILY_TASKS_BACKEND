const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    config.get('jwtPrivateKey')
  );

  return token;
};

const genericSchema = {
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(255).required(),
};

function validateLoginUser(req) {
  const schema = {
    ..._.pick(genericSchema, ['email', 'password']),
  };
  return Joi.validate(req, schema);
}

function validateUserSignUpUser(req) {
  const schema = {
    ..._.pick(genericSchema, ['name', 'email', 'password']),
  };
  return Joi.validate(req, schema);
}

exports.User = mongoose.model('User', userSchema);
exports.validateLoginUser = validateLoginUser;
exports.validateUserSignUpUser = validateUserSignUpUser;
