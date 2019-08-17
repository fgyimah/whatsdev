const express = require("express");
const router = express.Router();

//@route GET api/users/test
//@desc Test users Route
//@access public
router.get("/test", (req, res) => {
  res.json({
    messgae: "Users route works"
  });
});

module.exports = router;
