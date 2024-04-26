const express = require("express");

const router = express.Router();//express provides router for routing
const {
  getAllContacts,
  createContacts,
  updateContacts,
  deleteContacts,
  getContacts,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getAllContacts).post(createContacts);
router
  .route("/:id")
  .get(getContacts)//get specific contacts
  .put(updateContacts)//update existing contacts
  .delete(deleteContacts);//delete existing contacts

module.exports = router;
