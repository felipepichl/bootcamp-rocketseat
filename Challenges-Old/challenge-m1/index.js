const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const idade = moment().diff(moment(req.body.dataNascimento, 'YYYY/MM/DD'), 'years');

  if (req.body.dataNascimento === '') {
    res.render('main');
  } else if (idade > 18) {
    res.redirect(`/major?nome=${req.body.nome}`);
  } else {
    res.redirect(`/minor?nome=${req.body.nome}`);
  }
});

const middleware = (req, res, next) => {
  if (req.query.nome === undefined || req.query.nome === '') {
    res.render('main');
  } else {
    next();
  }
};

app.get('/major', middleware, (req, res) => {
  res.render('major', { nome: req.query.nome });
});

app.get('/minor', middleware, (req, res) => {
  res.render('minor', { nome: req.query.nome });
});

app.listen(3000);
