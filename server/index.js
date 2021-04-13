const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://rubensalbergaria:@crud.gonva.mongodb.net/food?retryWrites=true&w=majority', {
  //COLOCAR PASSWORD APÓS rubensalbergaria e o nome da database após net/
  useNewUrlParser: true,
  useUnifiedTopology: true, //recomendado pelo terminal por se tratar de versao que ficará deprecada
}) 


//passando dados pro db:
app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days }); 
  try {
    await food.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err)
  }
})


app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }

    res.send(result)
  })
})

app.listen(3001, () => {
  console.log('server is running on port 3001')
});