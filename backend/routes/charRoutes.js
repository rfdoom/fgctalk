const express = require('express');
const router = express.Router();
const { 
  createCharacter, 
  getCharacters, 
  getCharacter, 
  deleteCharacter, 
  updateCharacter, 
  addCommentToCharacter,
  getComment
} = require('../controllers/charCont.js');


router.get('/characters', getCharacters);

router.get('/characters/:id', getCharacter);

router.post('/characters', createCharacter);

router.delete('/characters/:id', deleteCharacter);

router.patch('/characters/:id', updateCharacter);

router.post('/characters/:id', addCommentToCharacter);

router.get('/comments/:id', getComment);

module.exports = router;