const mongoose = require('mongoose');

//control entradas por consola
if(process.argv.length < 3) {
    console.log('Por favor, proporciona la contraseña, el nombre y el teléfono como argumentos: node mongo.js <password> <nombre> <telefono>')
    process.exit(1);
}

//guardamos los datos de la consola
const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]


//creamos la conexion
const url = `mongodb+srv://test1002542235:${password}@cluster0.70zx4ii.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.connect(url)
.then(result => {console.log('connected to database')})
.catch(error => console.log(error.message));


//creamos el esquema
const personSchema = new mongoose.Schema({
    name: String,
    phone: String
})

//creamos el modelo
const Person = mongoose.model('Person', personSchema)

//si se proporciona el nombre y el teléfono, guardamos la persona
if(process.argv.length > 3){
    //creamos una nueva persona
    const person = new Person({
        name: name,
        phone: phone
    })
    
    //guardamos la persona
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.phone} to phonebook`)
        mongoose.connection.close()
    }).catch(error => console.log(error.message))
}
//si solo se proporciona la contraseña, mostramos todas las personas
if(process.argv.length === 3){
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.phone}`)
        })
        mongoose.connection.close()
    })
}


