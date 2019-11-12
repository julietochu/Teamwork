import db from './db';

const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createUser = (request, response) => {
  const { name, email } = request.body;

  db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`User added with ID: ${results.insertId}`);
  });
};
module.exports = {
  getUsers,
  createUser,
};


/*

const signin = (request, response) => {
    const { email, password } = request.body

    pool.query(
        'signin user SET  email = $1, password = $2',
        [email, password],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`success`)
        }
    )
}


module.exports = {
    getUsers,
    createUser,
    signin

}
const createGifs = (request, response) => {
    const { title, image_url } = request.body

    pool.query('INSERT INTO gifs (title, image_url) VALUES ($1, $2)', [title, image_url], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Gifs added with ID: ${result.insertId}`)
    })
}
const createArticles = (request, response) => {
    const { title, message } = request.body

    pool.query('INSERT INTO articles (title, message) VALUES ($1, $2)', [title, message], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Articles added with ID: ${result.insertId}`)
    })
}
const updateArticles = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, message } = request.body

    pool.query(
        'UPDATE articles SET title = $1, message = $2 WHERE id = $3',
        [title, message, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`articles modified with ID: ${id}`)
        }
    )
}
const deleteArticle = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Article deleted with ID: ${id}`)
    })
}
const deleteGif = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM gifs WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Gif deleted with ID: ${id}`)
    })
}
const postArticle = (request, response) => {
    const { title, message } = request.body

    pool.query('INSERT COMMENTS INTO articles (title, message) VALUES ($1, $2)', [title, message], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Articles added with ID: ${result.insertId}`)
    })
}
const postGif = (request, response) => {
    const { title, message } = request.body

    pool.query('INSERT COMMENTS INTO articles (title, image_url) VALUES ($1, $2)', [title, message], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Articles added with ID: ${result.insertId}`)
    })
}
const getArticles = (request, response) => {
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getArticleById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
*/
