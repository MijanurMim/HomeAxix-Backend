const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  CreateOrUpdateUser,
  CurrentUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { AuthCheck } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/create-or-update-user", AuthCheck, CreateOrUpdateUser);
router.post("/currentuser", AuthCheck, CurrentUser);

// router.route("/register").post(registerUser);

// router.route("/login").post(loginUser);

// router.route("/logout").get(logout);

// router.route("/me").get(isAuthenticatedUser, getUserDetails);

// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
