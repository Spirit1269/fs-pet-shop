let fs = require('fs');
// const http = request('http')
// const port = 3000;
// const server = http.createServer((req, res) => {
//     console.log("incoming request")
//     if (err) {
//         console.error(err)
//     } else {
//         console.log(data)
//     }
// })

// server.listen(port, (error) =>)


fs.readFile("pets.json", 'utf-8',(error,data)=> {
    console.log(error)
    let pets = JSON.parse(data)
    let option = process.argv[2]
    let index = process.argv[3]
    if (!option) {
            console.error('Usage: node pets.js [read | create | update | destroy]');
            process.exit(1);
    } else if(option === 'read'){
        if (index){
            console.log(pets[index])
        } else if (index=== null){
            console.log('Usage: node pets.js read INDEX')
        } else {
            console.log(pets);
        }
    }
})
