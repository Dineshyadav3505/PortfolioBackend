const express = require('express');
const { getAllProduts, createProduct, updateProduct, deleteProduct, getProdutsDetails } = require('../Controllers/pyhtonController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth');

const router = express.Router();

router.route("/python").get(getAllProduts);

router
.route("/python/new/data")
.post(createProduct);

router
.route("/python/:id")
.put(updateProduct)
.delete(deleteProduct)
.get(getProdutsDetails);

module.exports =router