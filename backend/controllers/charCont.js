const Character = require('../models/charModels');
const Comment = require('../models/comModels');
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
    return res.status(404).json({error: 'Internal Server Error'});
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

// add comment
const addCommentToCharacter = async (req, res) => {
  
  try {
    const { characterID, author, text } = req.body;
    console.log(`characterid: ${characterID}, author: ${author}, text: ${text}`);
    const newComment = new Comment({ author, text });

    await newComment.save();

    const character = await Character.findByIdAndUpdate(
      characterID,
      { $push: { comments: newComment._id }},
      { new: true }
    );
    
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// find comment
const getComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    console.log(`commentid: ${commentId}`);

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createCharacter,
  getCharacter,
  getCharacters, 
  deleteCharacter, 
  updateCharacter, 
  addCommentToCharacter,
  getComment
}