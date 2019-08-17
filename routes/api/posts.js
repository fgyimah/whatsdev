const express = require("express");
const router = express.Router();

//@route GET api/posts/test
//@desc Test posts Route
//@access public
router.get("/test", (req, res) => {
  res.json({
    messgae: "Posts route works"
  });
});

module.exports = router;
