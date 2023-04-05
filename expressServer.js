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
app.post('/pets', (req, res) => {
    // Assuming the request body contains JSON data for the new pet:
    const newPet = req.body;
  
    fs.readFile('pets.json', 'utf-8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading pets database');
        return;
      }
  
      const pets = JSON.parse(data);
      const newPetId = pets.length + 1; // Assign a new ID to the pet
  
      // Add the new pet to the database
      pets.push({ id: newPetId, ...newPet });
      fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
        if (err) {
          res.status(500).send('Error writing pets database');
          return;
        }
  
        res.status(201).json({ id: newPetId, ...newPet });
      });
    });
  });
  