const express = require("express");
const {
  getTransactions,
  addTransaction, updateTransaction,
  getTransactionById, deleteTransation
} = require("../controllers/transactionController");

const router = express.Router();

// Getting all the transactions
router.post("/alltransactions", getTransactions);

// Add transactions
router.post("/addtransaction", addTransaction);

// Update transaction
router.patch("/transaction/:id", updateTransaction);

router.get("/transaction/:id", getTransactionById);

// Delete transaction
router.delete("/transaction/:id", deleteTransation)


module.exports = router;
