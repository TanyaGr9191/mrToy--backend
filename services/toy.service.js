const fs = require('fs')
var gToys = require('../data/toys.json')

module.exports = {
    query,
    getById,
    remove,
    save,
}

function query(){
    return Promise.resolve(gToys)
}

function getById(toyId){
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId){
    const idx = gToys.findIndex(toy => toy._id === toyId)
    gToys.splice(idx, 1)

    return _saveToysToFile()
}

function save(toy) {
    if (toy._id){
        const toyToUpdate = gToys.find(currToy => currToy._id === toy._id)

        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.label = toy.label
    } else {
        toy._id = _makeId()
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

function _saveToysToFile(){
    return new Promise ((resolve, reject)=>{
        const data = JSON.stringify(gToys, null, 2)
        fs.writeFile('data/toys.json', data, (err)=>{
            if(err) return reject('Cannot save to file')
            resolve()
        })
    })

}