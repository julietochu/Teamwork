import '@babel/polyfill';
import User from './User';
import Gifs from './Gifs';
import Articles from './Articles';

const express = require('express');

const router = express.Router();

router.post('/users', User.create);
router.post('/signin', User.signin);
router.get('/users', User.getUsers);
router.post('/gifs', Gifs.create);
router.post('/articles', Articles.create);
router.patch('/articles/:id', Articles.update);
router.delete('/articles/:id', Articles.delete);
router.delete('/gifs/:id', Gifs.delete);
router.get('/articles/:id', Articles.viewOne);
router.get('/gifs/:id', Gifs.viewOne);
router.post('/article/:id/comment', Articles.comment);

module.exports = router;
