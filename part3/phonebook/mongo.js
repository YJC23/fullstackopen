const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
// console.log("password: " + process.argv[2])

const url = `mongodb+srv://yjcsean:${password}@cluster0.i5etwsh.mongodb.net/phonebook?appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name}: ${person.number}`)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
  
} else {
  console.log('error')
  process.exit(1)
}

s