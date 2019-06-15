const express = require('express');
const router = express.Router(); //chamando o express do router
const auth = require('../../middleware/auth');

//Item model - fazendo a chamada

const Item = require('../../models/Item');

// @route   GET to api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 }) //descendente = -1
        .then(items => res.json(items))//promise
});

// @route   post to api/items
// @desc    create a item
// @access  Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({//new item pq item é o nome da model
        name: req.body.name //vem do request de Item.js.
    }); 

    newItem.save().then(item => res.json(item));//salva no bd e devolve em json com promise
});

// @route   delete to api/items/:id
// @desc    delete a item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  //placeholder para qualquer coisa que passamos como ID
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ sucess: true }))) //pega da URI
    .catch((err) => res.status(404).json({ sucess: false }));
});

module.exports = router;