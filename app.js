const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;
const Product = require('./models/productModel');
const Purhase = require('./models/purchaseModel');
const PriceChange = require('./models/priceChange');
const productRouter = require('./routes/productRouter')(Product);
const purchaseRouter = require('./routes/purchaseRouter')(Product, Purhase);
const priceRouter = require('./routes/priceRouter')(PriceChange);
const mongoose = require('mongoose');
const cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const db = mongoose.connect('mongodb://localhost/productAPI', { useNewUrlParser: true })
  .then(() => console.log('Connect to DB sucess'))
  .catch((err) => console.log(err));


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use('/api', productRouter);
app.use('/api', purchaseRouter);
app.use('/api', priceRouter);

app.get('/', (req, res) => {
  res.send('Wellcom to Simple Shop API!');
});

app.listen(port, () => {
  console.log(`Running on port " ${port}`);
});

// function myTimer() {
//   Product.find((err, products) => {
//     for (let prod of products) {
//       let dateNow = new Date().toUTCString();
//       let change = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
//       let growth = (Math.random() > 0.5)
//       if (growth) {
//         prod.currPrice += (Math.round(prod.currPrice * change)) / 100;
//         prod.priceChange = change;
//         prod.save();
//         priceChange = new PriceChange({ name: prod.name, price: prod.currPrice, date: dateNow });
//         priceChange.save();
//       }
//       else if (prod.currPrice - prod.currPrice * change / 100 >= 0.1) {
//         prod.currPrice -= (Math.round(prod.currPrice * change)) / 100;
//         prod.priceChange = 0 - change;
//         prod.save();
//         priceChange = new PriceChange({ name: prod.name, price: prod.currPrice, date: dateNow });
//         priceChange.save();
//       }
//     }
//   });
// }

// setInterval(myTimer, 60000);