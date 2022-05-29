const express = require("express");
const {
  getAllProjects,

  createProject,
  updateProject,
  deleteProject,
  getProjectDetails,
} = require("../controllers/projectController");
const { AdminCheckMiddleWare } = require("../middleware/AdminMiddleWare");

const { AuthCheck } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.route("/projects").get(getAllProjects);

// router
//   .route("/admin/projects")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProjects);

router
  .route("/admin/project/new")
  .post(AuthCheck, AdminCheckMiddleWare, createProject);

router
  .route("/admin/project/:id")
  .put(AuthCheck, AdminCheckMiddleWare, updateProject)
  .delete(AuthCheck, AdminCheckMiddleWare, deleteProject);

router.route("/project/:id").get(getProjectDetails);

module.exports = router;
