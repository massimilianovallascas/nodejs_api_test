var mysql = require("mysql");

const connection = mysql.createConnection({ 
  host: process.env.MYSQL_HOST, 
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE
});

connection.connect(function(error) {
  if (error) {
    console.log('Error connecting to db: ', error);
    return;
  }
  console.log('Connection to db established');
  connection.query('CREATE TABLE IF NOT EXISTS books (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, isbn VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, year INT NOT NULL)', function(error) {
    if (error) {
      throw error;
    }
  });
});

const index = (request, response) => {
  // console.log('Index')
  connection.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }   
    response.status(200).json(results)
  })
}

const show = (request, response) => {
  const id = parseInt(request.params.id)
  // console.log('Show ' + id)

  connection.query('SELECT * FROM books WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
  })
}

const create = (request, response) => {
  // console.log('Create')
  const { isbn, title, author, year } = request.body

  connection.query('INSERT INTO books (isbn, title, author, year) VALUES (?, ?, ?, ?)', [isbn, title, author, year], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with id: ${results.insertId}`)
  })
}

const update = (request, response) => {
  const id = parseInt(request.params.id)
  const { isbn, title, author, year } = request.body
  // console.log('Update ' + id)

  connection.query('UPDATE books SET isbn = ?, title = ?, author = ?, year = ? WHERE id = ?', [isbn, title, author, year, id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with id: ${id}`)
    }
  )
}

const destroy = (request, response) => {
  const id = parseInt(request.params.id)
  // console.log('Destroy ' + id)

  connection.query('DELETE FROM books WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with id: ${id}`)
  })
}

const truncate = (request, response) => {
  // console.log('Truncate')

  connection.query('TRUNCATE books', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Table truncated`)
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  truncate
}