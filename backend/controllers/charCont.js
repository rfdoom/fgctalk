const Character = require('../models/charModels');
const mongoose = require('mongoose');

// get all characters
const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find({}).sort({createdAt: -1});
    res.status(200).json(characters);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
}

//get single character
const getCharacter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({err: 'Does not exist'})
  }

  const character = await Character.findById(id);

  if (!character) {
    return res.status(404).json({err: err.message});
  }
  res.status(200).json(character);
}

// post character
const createCharacter = async (req, res) => {
  const {name, description} = req.body;

  try {
    const character = await Character.create({name, description})
    res.status(200).json(character);
  } catch (err) {
    res.status(400).json({err: err.message});
  }
}

// delete character
const deleteCharacter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({err: 'Does not exist'})
  }
  
  const character = await Character.findOneAndDelete({_id: id});

  if (!character) {
    return res.status(404).json({err: err.message});
  }
  res.status(200).json(character);
}
// update character
const updateCharacter = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({err: 'Does not exist'})
  }

  const character = await Character.findOneAndUpdate({_id: id}, {
    ...req.body
  });

  if (!character) {
    return res.status(404).json({err: err.message});
  }
  res.status(200).json(character);
}


module.exports = {
  createCharacter,
  getCharacter,
  getCharacters, 
  deleteCharacter, 
  updateCharacter
}