const express = require('express');

function routes(PriceChange) {
  const priceRouter = express.Router();
  priceRouter.route('/prices')
    .get((res) => {
      PriceChange.find((err, prices) => {
        if (err)
          return res.send(err);
        return res.json(prices);
      });
    })
    .delete((res)  => {
      PriceChange.find((err) => {
        if (err)
          return res.send(err);
        PriceChange.remove();
        res.sendStatus(200);
      });
    });
  return priceRouter;
}
module.exports = routes;