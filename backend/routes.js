import '@babel/polyfill';
import User from './User';
import Gifs from './Gifs';
import Articles from './Articles';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

router.post('/users', User.create);
router.post('/signin', User.signin);
router.get('/users', queries.getUsers);
router.post('/gifs', Gifs.create);
router.post('/articles', Articles.create);
router.patch('/articles/:id', Articles.edit);

module.exports = router;
