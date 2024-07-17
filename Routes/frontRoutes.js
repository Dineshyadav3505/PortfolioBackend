const express = require('express');
const { getAllProduts, createProduct, updateProduct, deleteProduct, getProdutsDetails } = require('../Controllers/frontController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth');

const router = express.Router();

router.route("/front").get(getAllProduts);

router
.route("/front/new/data")
.post(createProduct);

router
.route("/front/:id")
.put(updateProduct)
.delete(deleteProduct)
.get(getProdutsDetails);

module.exports =router