const express = require('express');
const { getAllProduts, createProduct, updateProduct, deleteProduct, getProdutsDetails } = require('../Controllers/analysisController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth');

const router = express.Router();

router.route("/analysis").get(getAllProduts);

router
.route("/analysis/new/data").post(createProduct);

router
.route("/analysis/:id")
.put(updateProduct)
.delete(deleteProduct)
.get(getProdutsDetails);

module.exports =router