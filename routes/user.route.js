let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

//User Models
let userSchema = require("../models/User");
let MoneySchema = require("../models/TransferMoney");

// CREATE user
router.post("/create-user", (req, res) => {
  const user = new userSchema({
    name: req.body.name,
    email: req.body.email,
    amount: req.body.amount,
  });
});

//Create transactions
router.post("/create-transaction", async (req, res) => {
  const { name1, name2, amount } = req.body;
  const from = name1,
    to = name2;
  try {
    const fromCustomer = await userSchema.findOne({ name: `${from}` });
    const newFromBalance = Number(fromCustomer.amount) - Number(amount);
    userSchema.updateOne({ name: from }, { amount: newFromBalance }, err => {
      if (err) {
        console.log(err);
        res.status(500).send("Server Error");
      } else {
        console.log("UPDATED");
      }
    });
    const toCustomer = await userSchema.findOne({ name: `${to}` });
    const newToBalance = Number(toCustomer.amount) + Number(amount);
    userSchema.updateOne({ name: to }, { amount: newToBalance }, err => {
      if (err) {
        console.log(err);
        res.status(500).send("Server Error");
      } else {
        console.log("UPDATED");
      }
    });
    const transaction = new MoneySchema({
      name1: name1,
      name2: name2,
      amount,
    });
    transaction.save();
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// READ user
router.get("/", (req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//Read Transactions
router.get("/transaction-history", (req, res) => {
  MoneySchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//Delete user
router.delete("/delete-user/:id", (req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
