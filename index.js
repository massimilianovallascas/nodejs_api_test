const bodyParser = require('body-parser')
const books = require('./books')
const express = require('express')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/books', books.index)
app.get('/books/:id', books.show)
app.post('/books', books.create)
app.put('/books/:id', books.update)
app.delete('/books/:id', books.destroy)
app.delete('/books', books.truncate)

const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('App started at http://%s:%s', host, port);
});

module.exports = server