/
const fs = require('fs');

// Check if the command-line arguments are valid
const args = process.argv.slice(2);
const command = args[0];
const index = args[1];
const age = args[1];
const kind = args[2];
const name = args[3];

if (!command) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

// Read the pets.json file and parse its data to a native JavaScript object
fs.readFile('pets.json', 'utf-8', (err, data) => {
//   if (err) throw err;

  const pets = JSON.parse(data);

  if (command === 'read') {
    if (!index) {
      console.log(pets);
    } else if (index >= 0 && index < pets.length) {
      console.log(pets[index]);
    } else {
      console.error('Usage: node pets.js read INDEX');
      process.exit(1);
    }
  } else if (command === 'create') {
    if (!age || !kind || !name) {
      console.error('Usage: node pets.js create AGE KIND NAME');
      process.exit(1);
    }

    const newPet = {
      age: parseInt(age),
      kind,
      name,
    };

    pets.push(newPet);

    fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
      if (err) throw err;

      console.log(newPet);
    });
  }
});
