const express = require("express");
const transactionModel = require("../models/transactionModel");
const moment = require("moment");

// Get all transactions
const getTransactions = async (req, res) => {
  const categoryFilter =
    req.body.categoryFilter !== "All" && req.body.categoryFilter;

  const frequency = req.body.frequency !== "All" && req.body.frequency;

  try {
    const allTransactions = await transactionModel.find({
      userId: req.body.userId,
      ...(frequency && {
        date: { $gt: moment().subtract(Number(frequency), "d").toDate() },
      }),
      ...(categoryFilter && { type: categoryFilter }),
    });
    res.status(200).json({
      success: true,
      transactions: allTransactions,
    });
  } catch (error) {
    res.send(error);
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const getDetailsById = await transactionModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: getDetailsById,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};

// Update transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const currentTransaction = await transactionModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({
      success: true,
      transaction: currentTransaction,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};

// Adding Transaction
async function addTransaction(req, res) {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(200).json({
      success: true,
      message: "Transaction added successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
}

// Delete Transaction
const deleteTransation = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  getTransactionById,
  deleteTransation,
};
