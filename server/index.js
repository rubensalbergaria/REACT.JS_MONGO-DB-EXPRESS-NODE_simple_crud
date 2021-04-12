const express = require('express');
const mongoose = require('mongoose');
const app = express();


const FoodModel = require("./models/Food");

app.use(express.json());

//conectando com o db:
mongoose.connect('mongodb+srv://rubensalbergaria:@crud.gonva.mongodb.net/test', { //COLOCAR PASSWORD APÓS rubensalbergaria 
  useNewUrlParser: true,
  useUnifiedTopology: true, //recomendado pelo terminal por se tratar de versao que ficará deprecada
}) 


//passando dados pro db:
app.get('/', async (req, res) => {
  const food = new FoodModel({ foodName: "Apple", daysSinceIAte: 3 });
  try {
    await food.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err)
  }
})

app.listen(3001, () => {
  console.log('server is running on port 3001')
});