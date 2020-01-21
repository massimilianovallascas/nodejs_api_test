
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

const books = [{
  'isbn': '11111111',
  'title': 'Let\'s write some node JS',
  'author': 'Massi',
  'year': '2020'
},
{
  'isbn': '22222222',
  'title': 'How to run a business',
  'author': 'Peeps',
  'year': '2008'
},
{
  'isbn': '33333333',
  'title': 'How to become a designer',
  'author': 'Stef',
  'year': '2020'
},
{
  'isbn': '44444444',
  'title': 'Ehhh ma... the best excuses for every occasion',
  'author': 'Frix',
  'year': '1981'
},
{
  'isbn': '55555555',
  'title': 'Crossfit for dummies',
  'author': 'Pablo',
  'year': '2006'
},
{
  'isbn': '66666666',
  'title': 'The perfect old fashioned',
  'author': 'Marco',
  'year': '2020'
},
{
  'isbn': '77777777',
  'title': 'How to juggle 5 balls',
  'author': 'Gabry',
  'year': '2012'
}]

describe('Books tests', function () {
  describe('Truncate the table', function () {
    it('It should truncate the table and so remove all the data', done => {
      chai.request(server)
        .delete('/books/')
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          // onsole.log('Response body:', res.body);
          done()
        })
    })
  })

  describe('Crud operations', function () {
    it('Should add books into the database', (done) => {
      for (book in books) {
        chai.request(server)
          .post('/books')
          .send(books[book])
          .end((err, res) => {
            res.should.have.status(201);
            // console.log('Response body:', res.body);
          })
      }
      done()
    })

    it('Should fecth all the books from the database', (done) => {
      chai.request(server)
        .get('/books')
        .end((err, result) => {
          result.should.have.status(200);
          console.log('Received', result.body.length, 'records')
          done()
        })
    })

    it('Should fetch data for a particular book only', (done) => {
      chai.request(server)
        .get('/books/' + 1)
        .end((err, result) => {
          result.should.have.status(200)
          // console.log('Result body:', result.body)
          done()
        })
    })

    it('Should update data for a partcular book only', (done) => {
      const book = {
        'isbn': '121213',
        'title': 'The perfect old fashioned',
        'author': 'Marco',
        'year': '2017'
      }

      chai.request(server)
        .put('/books/' + 6)
        .send(book)
        .end((err, result) => {
          result.should.have.status(200)
          // console.log('Result body:', result.body)
          done()
        })
    })

    it('Should check data updated in DB', (done) => {
      chai.request(server)
        .get('/books/' + 6)
        .end((err, result) => {
          result.should.have.status(200)
          result.body[0].year.should.eq(2017)
          // console.log('Result body:', result.body)
          done()
        })
    })

    it('Should delete a particular book', (done) => {
      chai.request(server)
        .delete('/books/' + 4)
        .end((err, result) => {
          result.should.have.status(200)
          // console.log('Result body:', result.body)
          done()
        })
    })

    it('Should confirm the book has been deleted from the database', (done) => {
      chai.request(server)
        .get('/books')
        .end((err, result) => {
          result.should.have.status(200);
          result.body.length.should.eq(books.length-1);
          console.log('Received', result.body.length, 'records')
          // console.log('Result body:', result.body)
          done()
        })
    })
  })
})