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

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => { //a função findById é do proprio mongoose
      updatedFood.foodName = newFoodName
      updatedFood.save();
      res.send("Updated")
    })
  } catch (err) {
    console.log(err)
  }
})

app.delete("/delete/:id", async (req, res) => { //recebendo o id pelo proprio browser, nao pode passar via objeto do front pro back
  const id = req.params.id
  
  await (await FoodModel.findByIdAndRemove(id)).execPopulate(); //findByIdAndDelete é outra função do proprio mongoose
  res.send('deleted');
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