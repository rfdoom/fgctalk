const express = require('express');
const router = express.Router();
const {createCharacter, getCharacters, getCharacter, deleteCharacter, updateCharacter} = require('../controllers/charCont.js');

router.get('/', getCharacters);

router.get('/:id', getCharacter);

router.post('/', createCharacter);

router.delete('/:id', deleteCharacter);

router.patch('/:id', updateCharacter);

module.exports = router;