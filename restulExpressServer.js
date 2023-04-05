const express = require('express');
const app = express();

app.use(express.json());

// Database to store pets
const pets = [];

// Helper function to get the index of a pet in the database
function findPetIndex(id) {
  return pets.findIndex(pet => pet.id === id);
}

// Route handler for creating a pet
app.post('/pets', (req, res) => {
  const pet = req.body;
  pet.id = pets.length + 1;
  pets.push(pet);
  res.status(200).json(pet);
});

// Route handler for getting a pet
app.get('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = findPetIndex(id);
  if (index === -1) {
    res.status(404).send('Not Found');
  } else {
    const pet = pets[index];
    res.status(200).json(pet);
  }
});

// Route handler for updating a pet
app.patch('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = findPetIndex(id);
  if (index === -1) {
    res.status(404).send('Not Found');
  } else {
    const pet = pets[index];
    const { name, age, kind } = req.body;
    if (typeof age === 'number' && kind && name) {
      pet.name = name;
      pet.age = age;
      pet.kind = kind;
    }
    res.status(200).json(pet);
  }
});

// Route handler for deleting a pet
app.delete('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = findPetIndex(id);
  if (index === -1) {
    res.status(404).send('Not Found');
  } else {
    const pet = pets.splice(index, 1)[0];
    res.status(200).json(pet);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});