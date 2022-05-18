const catchAsyncErrors = require("../middleware/catchAsyncError");
const Project = require("../models/projectModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
var cloudinary = require("cloudinary");

// Create Project -- Admin
exports.createProject = catchAsyncErrors(async (req, res, next) => {
  let images = req.body.images;

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "projects",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  // console.log(imagesLinks);

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  // console.log(req.body.images);

  const project = await Project.create(req.body);

  // console.log(project);

  res.status(201).json({
    success: true,
    project,
  });
});

// Get All Project
exports.getAllProjects = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 6;
  const projectsCount = await Project.countDocuments();

  const apiFeature = new ApiFeatures(Project.find(), req.query)

    .filter()
    .pagination(resultPerPage);

  const projects = await apiFeature.query;

  res.status(200).json({
    success: true,
    projects,
    projectsCount,
    resultPerPage,
  });
});

// Get All Projects (Admin)
exports.getAdminProjects = catchAsyncErrors(async (req, res) => {
  const projects = await Project.find();

  res.status(200).json({
    success: true,
    projects,
  });
});

// Get Single Project Details
exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Update Project -- Admin
exports.updateProject = catchAsyncErrors(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  // cloudinary Settings
  let images = req.body.images;

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < project.images.length; i++) {
      await cloudinary.v2.uploader.destroy(project.images[i].public_id);
    }
  }
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "projects",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    project,
  });
});

// Delete Project -
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < project.images.length; i++) {
    await cloudinary.v2.uploader.destroy(project.images[i].public_id);
  }
  await project.remove();

  res.status(200).json({
    success: true,
    message: "Project Deleted Successfully",
  });
});

// // Create New Review / Update the Review
// exports.createProjectReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, projectId } = req.body;

//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };

//   const project = await Project.findById(projectId);

//   const isReviewed = project.reviews.find(
//     (rev) => rev.user.toString() === req.user._id.toString()
//   );

//   if (isReviewed) {
//     project.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user._id.toString())
//         (rev.rating = rating), (rev.comment = comment);
//     });
//   } else {
//     project.reviews.push(review);
//     project.numOfReviews = project.reviews.length;
//   }

//   let avg = 0;

//   project.reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   project.ratings = avg / project.reviews.length;

//   await project.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Get All Reviews of a Project
// exports.getProjectReviews = catchAsyncErrors(async (req, res, next) => {
//   const project = await Project.findById(req.query.id);

//   if (!project) {
//     return next(new ErrorHandler("Project Not Found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     reviews: project.reviews,
//   });
// });

// Delete Review of a Project
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const project = await Project.findById(req.query.projectId);

//   if (!project) {
//     return next(new ErrorHandler("Project Not Found", 404));
//   }

//   const reviews = project.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   const ratings = avg / reviews.length;

//   const numOfReviews = reviews.length;

//   await Project.findByIdAndUpdate(
//     req.query.projectId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     message: "Review Deleted",
//   });
// });
