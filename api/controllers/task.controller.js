const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { Task, validateTask } = require('../data/task.model');

// GET ALL DAILY TASKS
module.exports.getAllDailyTasks = async ({ user: { _id: createdBy } }, res) => {
  try {
    let tasks = await Task.find({ createdBy });
    res.send(tasks);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

// GET SINGLE DAILY TASK
module.exports.getSingleDailyTask = async ({ params: { id } }, res) => {
  try {
    let task = await Task.findById(id);
    res.send(task);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

// POST NEW CATEGORY
module.exports.postDailyTask = async ({ body, user }, res) => {
  try {
    const { name } = body;

    const { _id: createdBy } = user;
    const { error } = validateTask(body);
    if (error) return res.status(400).send(error.details[0].message);
    let task = await Task.findOne({
      name,
      isDeleted: false,
    });

    if (task) {
      return res.status(400).send('You have already Created Same Task');
    }
    task = new Task({
      createdBy,
      ..._.pick(body, ['name']),
    });

    await task.save();

    res.send('Task Added Successfully');
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

// PUT EDIT OR UPDATE EXISTING DAILY TASK
module.exports.putDailyTask = async (
  { params: { id: _id }, user: { _id: createdBy }, body },
  res
) => {
  const { name } = body;
  const { error } = validateTask(body);
  if (error) return res.status(400).send(error.details[0].message);
  let task = await Task.findOne({ _id, isDeleted: false });
  if (!task) return res.status(400).send('No Task found against given id.');

  let task_duplication = await Task.findOne({
    name,
    isDeleted: false,
  });

  if (task_duplication)
    return res.status(400).send('Same Task already in List');

  await Task.updateOne({ _id }, { $set: { name, createdBy } });

  res.send('Category has been updated');
};

// DELETE EXISTING CATEGORY
module.exports.deleteDailyTask = async ({ params }, res) => {
  const task = await Task.findByIdAndDelete(params.id);

  if (!task)
    return res.status(400).send('The task with the given ID was not found.');

  res.send('Task deleted successfully from List');
};
