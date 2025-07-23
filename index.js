const express = require('express');
// const morgan = require('morgan')
const cors = require('cors');
require('./db');
const Person = require('./models/person');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Servir el frontend desde dist

/* Configurar Morgan con formato tiny + post-body
morgan.token('post-body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))
*/

// GET: Obtener todas las entradas de la agenda
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

// GET: Página /info
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`);
    })
    .catch((error) => next(error));
});

// GET: Obtener una persona por ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch((error) => next(error));
});

// DELETE: Eliminar una persona por ID
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch((error) => next(error));
});

// POST: Crear una nueva persona
app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((savedPerson) => res.status(201).json(savedPerson))
    .catch((error) => next(error));
});

// PUT: Actualiza el número de una persona existente
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  // Validar que 'number' no esté vacío
  if (!number) {
    return res.status(400).json({ error: 'Number missing' });
  }

  // new: true => devuelve el documento actualizado
  return Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        return res.json(updatedPerson);
      }
      return res.status(404).json({ error: 'Person not found' });
    })
    .catch((error) => next(error));
});

// Manejo de rutas desconocidas
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});

// Middleware de manejo de errores (siempre al final de los app.use)
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
