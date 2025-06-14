const express = require('express')
const morgan = require('morgan') // Importar Morgan
const cors = require('cors')
const app = express()

// Middlewares
app.use(cors())
// Enable JSON parsing middleware
app.use(express.json())
// Configurar Morgan con formato tiny + post-body
morgan.token('post-body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))

// Datos de la agenda telefónica
let persons = [
    { "id": 1, "name": "Arto Hellas", "number": "040-123456" },
    { "id": 2, "name": "Ada Lovelace", "number": "39-44-5323523" },
    { "id": 3, "name": "Dan Abramov", "number": "12-43-234345" },
    { "id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122" }
]

// Ruta GET para devolver todas las personas
app.get('/api/persons', (req, res) => {
    console.log('Persons list:', persons)   // Log the persons array
    res.json(persons)
})

// Nueva ruta GET para la página /info
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

// Nueva ruta para una persona por ID
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).json({ error: 'Person not found' })
})

// Nueva ruta para eliminar una persona por ID
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personExists = persons.find(p => p.id === id)
    if (!personExists) return res.status(404).json({ error: 'Person not found' })
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

// Nueva ruta para crear una persona
app.post('/api/persons', (req, res) => {
    const newPerson = req.body
    console.log('POST body:', newPerson) // Debug
    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json( {error: 'Name or number missing' })
    }
    if (persons.some(p => p.name === newPerson.name)) {
        return res.status(400).json({ error: 'Name must be unique' })
    }
    newPerson.id = Math.floor(Math.random() * 1000000)
    persons = [...persons, newPerson]
    res.status(201).json(newPerson)    
})

app.use((req, res) => res.status(404).json({ error: 'unknown endpoint' }))

// Iniciar el servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))