const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdBy: {
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

const genericSchema = {
  name: Joi.string().min(5).max(255).required(),
};

function validateTask(req) {
  const schema = {
    ..._.pick(genericSchema, ['name']),
  };
  return Joi.validate(req, schema);
}

exports.Task = mongoose.model('Tasks', taskSchema);
exports.validateTask = validateTask;
