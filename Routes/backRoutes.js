const express = require('express');
const { getAllProduts, createProduct, updateProduct, deleteProduct, getProdutsDetails } = require('../Controllers/backController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth');

const router = express.Router();

router.route("/backend").get(getAllProduts);

router.route("/backend/new/data").post(createProduct);
// .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);


router
.route("/backend/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)
.get(getProdutsDetails);

module.exports =router