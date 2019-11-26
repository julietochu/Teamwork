import moment from 'moment';
import uuidv4 from 'uuid/v4';
import multer from 'multer';
import { ConsoleReporter } from 'jasmine';
import db from './db';


const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dcfqfetvt',
  api_key: '812789161535632',
  api_secret: 'I7kXNk1kyCbLRXzZTiZxqsvIl78',
});


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const Gifs = {
  async create(req, res) {
    // save image to cloundinary and get image url
    // upload req.body.image to  cloundinary

    const upload = multer({ storage }).single('image');
    return upload(req, res, (err) => {
      if (err) {
        return res.send(err);
      }
      console.log('file uploaded to server');
      console.log(req.file);
      console.log(req.body);

      if (!req.body.title || !req.file) {
        return res.status(400).send({ message: 'image not found' });
      }

      // SEND FILE TO CLOUDINARY
      const { path } = req.file;
      const uniqueFilename = new Date().toISOString();

      return cloudinary.uploader.upload(
        path,
        { public_id: `gif/${uniqueFilename}`, tags: 'gif' }, // directory and tags are optional
        async (e, image) => {
          if (e) return res.send(e);
          console.log('file uploaded to Cloudinary');
          fs.unlinkSync(path);
          // return image details

          console.log(image);

          const imageUrl = image.url;
          const createQuery = `INSERT INTO
           gifs(id, title, image_url, created_on, message)
           VALUES($1, $2, $3, $4, $5)
           returning *`;
          const values = [
            uuidv4(),
            req.body.title,
            imageUrl,
            moment(new Date()),
            req.body.message,
          ];

          console.log(values);

          try {
            await db.query(createQuery, values);
            return res.status(201).send({ message: 'success' });
          } catch (error) {
            return res.status(400).send(error);
          }
        },
      );
    });
  },
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM gifs WHERE id=$1  returning *';
    const values = [
      req.params.id,
    ];
    try {
      const { rows } = await db.query(deleteQuery, values);
      console.log(rows);
      if (!rows[0]) {
        return res.status(404).send({ gif: 'gif not found' });
      }
      return res.status(200).send({ gif: 'deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
  async viewOne(req, res) {
    const findOneQuery = 'SELECT * FROM gifs WHERE id=$1';
    const values = [
      req.params.id,
    ];
    console.log(values);
    try {
      const { rows } = await db.query(findOneQuery, values);
      if (!rows[0]) {
        return res.status(404).send({ messsage: 'gif not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },


};

export default Gifs;
