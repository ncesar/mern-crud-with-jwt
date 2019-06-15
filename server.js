const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items');

const app = express();

//bodyparser middleware

app.use(express.json()); //bodyParser simplifica o request da API. Ele extrai o corpo de um request e adiciona isso no req.body

//DB CONFIG URI
const db = config.get('mongoURI');

//connect 2 mongodb
mongoose
  .connect(db, {useNewUrlParser: true, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected..')) //promise
  .catch((err) => console.log(err));

//use routes
app.use('/api/items', require('./routes/api/items')); //qualquer coisa que se refira a essa rota, tem que ser direcionada pra esse arquivo
app.use('/api/users', require('./routes/api/users')); //qualquer coisa que se refira a essa rota, tem que ser direcionada pra esse arquivo
app.use('/api/auth', require('./routes/api/auth')); //qualquer coisa que se refira a essa rota, tem que ser direcionada pra esse arquivo

//server static assets if in production >> deploy
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//porta
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server stated on port ${port}`));