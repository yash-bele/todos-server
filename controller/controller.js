require('dotenv').config();
const user = require('../model/model');
const todo = require('../model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getDataUp = async (req, res) => {
  try {
    const data = await user.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const postDatumUp = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const check = await user.findOne({ email });
    if (check) return res.status(400).json(`Email already exist!`);
    const hashPass = await bcrypt.hash(pass, 5);
    const datum = await user.create({ ...req.body, pass: hashPass });
    res.status(201).json(datum);
  } catch (error) {
    res.status(500).json(error);
  }
};

const postDatumIn = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const datum = await user.findOne({ email });
    if (!datum) return res.status(404).json(`Email doesn't exist!`);
    const comparePass = await bcrypt.compare(pass, datum.pass);
    if (!comparePass) return res.status(400).json(`Password incorrect!`);
    const { _id: id } = datum;
    const token = jwt.sign({ id }, process.env.JWT, {
      expiresIn: '900s',
    });
    res.status(200).json({ id, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ########################################################################3

const getDatumOn = async (req, res) => {
  try {
    const { id } = req.params;
    const datum = await user.findOne({ _id: id });
    if (!datum) return res.status(404).json(`id:${id} not found`);
    res.status(200).json(datum);
  } catch (error) {
    res.status(500).json(error);
  }
};

const patchDatumOn = async (req, res) => {
  try {
    const { id } = req.params;
    const datum = await user.findOneAndUpdate({ _id: id }, req.body);
    if (!datum) return res.status(404).json(`id:${id} not found`);
    res.status(200).json(datum);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const getDatumOn = async (req, res) => {
//   try {
//     const auth = await req.headers.authorization;
//     const token = auth.split(' ')[1];
//     if (!token) return res.status(401).json('No token');
//     const decoded = jwt.verify(token, process.env.JWT);
//     res.status(200).json(decoded.datum.todo);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports = {
  getDataUp,
  postDatumUp,
  postDatumIn,
  getDatumOn,
  patchDatumOn,
};
