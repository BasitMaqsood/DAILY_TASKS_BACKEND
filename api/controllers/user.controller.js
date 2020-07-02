const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {
  User,
  validateUserSignUpUser,
  validateLoginUser,
} = require('../data/user.model');

// Register the user API POST
module.exports.signUpUser = async (
  { body: { name, email, password } },
  res
) => {
  try {
    const { error } = validateUserSignUpUser({ name, email, password });
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).send('User name with this email already exists');

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send({
      token: user.generateAuthToken(),
    });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

// LogIn the user API POST
module.exports.loginUser = async ({ body: { email, password } }, res) => {
  try {
    const { error } = validateLoginUser({ email, password });
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email });

    if (!user) res.status(400).send('User does not exist.');
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      return res.send({
        token: user.generateAuthToken(),
      });
    } else return res.status(400).send('Invalid email or password');
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
