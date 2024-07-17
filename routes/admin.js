const express = require("express");
const router = express.Router();

const { createCategory, getCategories } = require("../controllers/category");
const { isAdmin, isauth } = require("../middlewares/auth");
const { fetchAdminData } = require("../controllers/admin");

router.post("/category/create", isauth, isAdmin, createCategory);

router.get("/category/all", getCategories);

router.post("/data", isauth, isAdmin, fetchAdminData);

module.exports = router;
