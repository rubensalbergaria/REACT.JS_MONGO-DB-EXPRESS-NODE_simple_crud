const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb+srv://rubensalbergaria:@crud.gonva.mongodb.net/food?retryWrites=true&w=majority', {
  useNewUrlParser: true,
})

//COLOCAR PASSWORD APÓS rubensalbergaria no link acima

app.listen(3001, () => {
  console.log('server is running on port 3001')
});