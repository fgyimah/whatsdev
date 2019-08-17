const express = require("express");
const router = express.Router();

//@route GET api/profile/test
//@desc Test profile Route
//@access public
router.get("/test", (req, res) => {
  res.json({
    messgae: "Profile route works"
  });
});

module.exports = router;
