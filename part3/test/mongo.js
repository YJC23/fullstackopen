const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
console.log("password: " + process.argv[2])

const url = `mongodb+srv://yjcsean:${password}@cluster0.i5etwsh.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// CREATE new note 
// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// DELETE note 
// Note.findByIdAndDelete("69b61b75d12f065f809de0fa")
//   .then(result => {
//     response.status(204).end()
//   })

// UPDATE note 
// Note.findById("69a2cf962b5655905d23932c")
//   .then(note => {
//     if (!note) {
//       return response.status(404).end()
//     }

//     note.content = "This is the changed content"
//     note.important = true 

//     return note.save().then((updatedNote) => {
//       response.json(updatedNote)
//     })
//   })
  
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})