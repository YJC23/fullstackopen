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
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

const id = '69bf777e2c8cbbe5e18bf00f'
Person.findByIdAndDelete(id).then(() => {
  console.log('deleted person')
})

Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
