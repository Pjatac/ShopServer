const express = require('express');

function routes(Product) {
  const productRouter = express.Router();
  productRouter.route('/products')
    .post(async function (req, res)  {
      const count = await Product.countDocuments();
      if (count < 5){
        const product = new Product(req.body);
        product.save();
        return res.json(product);
      } else {
        return res.json(`Sorry, maximum store capacity (5) reached`);
      }
    })
    .get((res) => {
      Product.find((err, products) => {
        if (err)
          return res.send(err);
        return res.json(products);
      });
    });
  productRouter.use('/products/:productId', (req, res, next) => {
    Product.findById(req.params.productId, (err, product) => {
      if (err)
        return res.send("Cant find");
      if (product) {
        req.product = product;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  productRouter.route('/products/:productId')
    .get((req, res) => res.json(req.product))
    .put((req, res) => {
      const { product } = req;
      product.name = req.body.name;
      product.qnt = req.body.qnt;
      product.currPrice = req.body.curPrice;
      product.save();
      return res.json(product);
    })
    .delete((req, res) => {
      Product.findOneAndDelete(req.product, function (err, result) {
        if (err)
          return res.send(err);
        res.sendStatus(200);
      });
    })
  return productRouter;
}
module.exports = routes;
