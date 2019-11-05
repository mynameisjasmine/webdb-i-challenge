const express = require('express');

const db = require('../data/dbConfig.js')
const knex = require('../data/dbConfig.js');

const router = express.Router();

//GET
router.get('/', (req, res) => {
knex
.select('*')
.from('accounts')
.then(accounts => {
res.status(200).json(accounts)
})
.catch(err => {
res.status(500).json({error: "Could not load data from accounts"})
 })
});

//GET by ID
router.get('/:id', (req, res) => {
knex
.select('*')
.from('accounts')
.where('id', '=', req.params.id).first()
.then(account => {
res.status(200).json(account)
 })
.catch(err => {
res.status(500).json({error: "Could not load data fromn specified id"})
 })
});

//POST
router.post('/', (req, res) => {
knex
.insert(req.body, 'id')
.into('accounts')
.then(ids => {
res.status(201).json(ids)
})
.catch(err => {
res.status(500).json({error: "Failed to insert post to database"})
 })
});

//PUT
router.put('/:id', (req, res) => {
const updatedInfo = req.body

knex('accounts')
.where({id: req.params.id})
.update(updatedInfo)
.then(count => {
res.status(200).json(count)
 })
.catch(err => {
res.status(500).json({error: "Failed to update account"})
 })
});

//DELETE
router.delete('/:id', (req, res) => {
knex('accounts')
.where({id: req.params.id})
.del()
.then(count => {
res.status(200).json(count)
})
.catch(err => {
res.status(500).json({err: "Failed to delete account"})
})
})

module.exports = router;