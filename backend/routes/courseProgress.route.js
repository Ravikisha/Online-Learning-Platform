import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsInCompleted,
  updateLectureProgress,
  getCertificate
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router
  .route("/:courseId/lecture/:lectureId/view")
  .post(isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);
router.route("/:courseId/downloadCertificate").get(isAuthenticated, getCertificate);

export default router;
