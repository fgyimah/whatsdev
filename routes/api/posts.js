const express = require("express");
const router = express.Router();
const passport = require("passport");

//Post model
const Post = require("../../models/Post");
//Profile model
const Profile = require("../../models/Profile");

//post validator
const validatePostInput = require("../../validation/post");

//@route GET api/posts/
//@desc get all posts
//@access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json(err));
});

//@route GET api/posts/:post_id
//@desc get single post by id
//@access public
router.get("/:post_id", (req, res) => {
  Post.findOne({ _id: req.params.post_id })
    .then(post => res.json(post))
    .catch(err => res.status(500).json(err));
});

//@route POST api/posts/
//@desc create post
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    //save post
    newPost
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

//@route DELETE api/posts/:post_id
//@desc delete post
//@access private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          //check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    });
  }
);

//@route POST api/posts/like/:post_id
//@desc like post
//@access private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          //add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post
            .save()
            .then(post => res.json(post))
            .catch(err =>
              res.status(500).json({ nopostfound: "Cannot find post" })
            );
        })
        .catch(err => res.status(500).json({ like: "Cannot like post" }));
    });
  }
);

//@route POST api/posts/unlike/:post_id
//@desc unlike post
//@access private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ noliked: "You have not yet liked the post" });
          }

          //get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //splice removeIndex out of likes array
          post.likes.splice(removeIndex, 1);
          //save post
          post
            .save()
            .then(post => res.json(post))
            .catch(err =>
              res
                .status(500)
                .json({ cannotremovepost: "Cannot remove like from post" })
            );
        })
        .catch(err => res.status(500).json({ like: "Post not found" }));
    });
  }
);

//@route POST api/posts/comment/:post_id
//@desc comment post
//@access private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      const { errors, isValid } = validatePostInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      //add comment to comments array
      post.comments.unshift(newComment);
      //save
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route DELETE api/posts/comment/:post_id/:comment_id
//@desc remove comment from post
//@access private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      //check if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        res.status(404).json({ commentnotexist: "comment does not exist" });
      }

      //get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      //splice out of array
      post.comments.splice(removeIndex, 1);
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err));
    });
  }
);

module.exports = router;
