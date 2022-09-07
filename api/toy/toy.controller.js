const express = require('express')
const toyService = require('../../services/toy.service')
const router = express.Router()

module.exports = router


//LIST
router.get('/', (req, res) => {
    const filterBy = { name: req.query.name || '',  minPrice: req.query.minPrice || 0}
    // if(req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
    // if(req.query.userId) filterBy.userId = req.query.userId

    toyService.query(filterBy)
        .then(toys => res.send(toys))
})

//READ
router.get('/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.getById(toyId)
        .then(toy => res.send(toy))
})

//CREATE
router.post('/', (req, res) => {
    let toy = req.body
    console.log('req.body', req.body)
    toyService.save(toy)
        .then(toy => res.send(toy))
})

//UPDATE
router.put('/:toyId', (req, res) => {

    const toy = req.body
    toyService.save(toy)
        .then(toy => res.send(toy))
        .catch((err) => {
            console.log('error', err)
            res.status(400).send('Cannot update toy!')
        })
})

//DELETE
router.delete('/:toyId', (req, res) => {

    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => res.send({ msg: 'Removed successfully' }))
        .catch((err)=>{
            console.log('error', err)
            res.status(400).send('Cannot remove bug, NOT YOUR BUG!')
        })
})
