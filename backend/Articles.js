/* eslint-disable indent */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './db';


const Articles = {
  async create(req, res) {
    console.log(req.body);
    if (!req.body.title || !req.body.article) {
      return res.status(400).send({ message: 'some values are missing' });
    }

    const createQuery = `INSERT INTO
      articles(id, title,created_on, article)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.title,
      moment(new Date()),
      req.body.article,

    ];

    console.log(values);

    try {
      const { rows } = await db.query(createQuery, values);
      const article = rows[0];
      return res.status(201).send({
        articleId: article.id,
        articleTitle: article.title,
        createdOn: article.created_on,
        article: article.article,
        message: 'article successfully posted',
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },


  async update(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE id=$1';
    const updateOneQuery = `UPDATE articles
      SET article=$1,title=$2,comment=$3
      WHERE id=$4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'article not found' });
      }
      console.log(rows);

      const values = [
        req.body.article || rows[0].article,
        req.body.title || rows[0].title,
        req.body.comment || rows[0].comment,
        req.params.id,
        ];
        console.log(values);

      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM articles WHERE id=$1  returning *';
    const values = [
      req.params.id,
    ];
    try {
      const { rows } = await db.query(deleteQuery, values);
      console.log(rows);
      if (!rows[0]) {
        return res.status(404).send({ message: 'article not found' });
      }
      return res.status(200).send({ message: 'deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async comment(req, res) {
    console.log(req.body);

    const commentQuery = `SELECT * FROM
      articles; UPDATE articles SET id=$1 INSERT INTO articles (comment)
      VALUES ($1)
      returning *`;
    const values = [
      req.body.comment,

    ];

    console.log(values);

    try {
      const { rows } = await db.query(commentQuery, values);
      const article = rows[0];
      return res.status(201).send({
        articleId: article.id,
        comment: article.comment,
        message: 'comment successfully created',
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async viewOne(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE id=$1';
    const values = [
      req.params.id,
    ];
    console.log(values);
    try {
      const { rows } = await db.query(findOneQuery, values);
      if (!rows[0]) {
        return res.status(404).send({ messsage: 'comment not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

};
export default Articles;
