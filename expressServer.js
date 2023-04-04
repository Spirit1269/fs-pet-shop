const express = require('express')
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res)=> {
    res.send ("Welcome to Pet Shop")
})

app.get('/pets', (req, res) =>{
    fs.readFile('pets.json', 'utf-8', (error, pets))
})
app.get('/pets/:petID', (req, res) => {
    fs.readFile('pets.json', 'utf-i',(error, petsString)=>{
    if (error) {
        res.error(error)
    }
    else {
        let pets=JSON.parse(petsString)
        res.json(pets[req.params.petID])
        res.status(200)
        res.end()
    }
})
})