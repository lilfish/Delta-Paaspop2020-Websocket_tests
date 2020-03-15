require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT;

app.set('view engine', 'pug')
app.set('public', path.join(__dirname, 'public'));
app.locals.basedir = app.get('public');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
