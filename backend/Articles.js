import uuidv4 from 'uuid/v4';
import db from './db';

const Articles = {
  async create(req, res) {
    console.log(req.body);
    if (!req.body.title || !req.body.article) {
      return res.status(400).send({ message: 'some values are missing' });
    }

    const createQuery = `INSERT INTO
      articles(id, title, article)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      uuidv4(),
      req.body.title,
      req.body.article,

    ];

    console.log(values);

    try {
      await db.query(createQuery, values);
      return res.status(201).send({ message: 'Article successfully posted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },


  async edit(req, res) {
    if (!req.params.id.body.title || !req.body.article) {
      return res.status(400).send({ message: 'some values are missing' });
    }

    const editQuery = `INSERT INTO
      article(id, title, article)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      uuidv4(),
      req.body.title,
      req.body.article,

    ];

    console.log(values);

    try {
      await db.query(editQuery, [req.params.id, req.article.id]);
      return res.status(201).send({ message: 'Article successfully edited' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
export default Articles;
