const fs = require('fs')
var gToys = require('../data/toys.json')

module.exports = {
    query,
    getById,
    remove,
    save,
}

function query(filterBy = {}) {
    console.log('filterByy', filterBy)

    var toys = gToys

    var { name, minPrice, date } = filterBy
    if (name) {
        const regex = new RegExp(name, 'i')
        toys = gToys.filter(toy => regex.test(toy.name))
    }

    if (minPrice || date) {
        minPrice = minPrice || 0
        toys = toys.filter(toy =>
            (toy.price > minPrice) ||
            (toy.createdAt < date))
    }

    console.log('toys', toys)
    return Promise.resolve(toys)
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    gToys.splice(idx, 1)

    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = gToys.find(currToy => currToy._id === toy._id)

        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.label = toy.label
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        gToys.push(toy)
    }
    return _saveToysToFile()
        .then(() => toy)
}

function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gToys, null, 2)
        fs.writeFile('data/toys.json', data, (err) => {
            if (err) return reject('Cannot save to file')
            resolve()
        })
    })

}

function _getNewToy() {
    return {
        name: _makeName(),
        price: utilService.getRandomIntInclusive(100, 600),
        label: _makeLabel(),
        inStock: _getRandomStock(),
        createdAt: Date.now()
    }

    function _getRandomStock() {
        return utilService.getRandomIntInclusive(0, 1) === 1 ? true : false
    }
}

function _makeName(size = 1) {
    var words = ['Pizza', 'Tofu', 'Coffee', 'Waffle']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
function _makeLabel(size = 1) {
    var words = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}