const express = require('express');

function routes(Product, Purchase) {
    const purchaseRouter = express.Router();
    purchaseRouter.route('/purchases')
        .post(async function (req, res) {
            const products = new Array();
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    products.push(req.body[key]);
                }
            }
            for (let prod of products) {
                const product = await Product.findById(prod._id);
                if (product && prod.qnt > product.qnt)
                    return res.send(`Sorry, insufficient stock quantity for ${prod.name}`);
            }
            for (let prod of products) {
                Product.findById(prod._id, (err, product) => {
                    if (err)
                        return res.send(err);
                    if (product && prod.qnt < product.qnt) {
                        product.qnt -= prod.qnt;
                        product.save();
                    } else if (product) {
                        product.remove(product);

                    }
                });
            }
            const purchase = new Purchase();
            for (let prod of products){
                 purchase.purchases.push({name: prod.name, qnt: prod.qnt, cost: prod.currPrice*prod.qnt})
            }
            purchase.save();
            return res.send(`ok`);
        })
        .get((res) => {
            Purchase.find((err, purchase) => {
              if (err) 
                return res.send(err);  
              return res.json(purchase);
              });
          });
    return purchaseRouter;
}
module.exports = routes;
