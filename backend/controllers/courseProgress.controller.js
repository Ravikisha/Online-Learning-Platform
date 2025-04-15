import { CourseProgress } from "../models/courseProgress.model.js";
import { Course } from "../models/course.model.js";
import pdfkit from "pdfkit";
import { User } from "../models/user.model.js";
import path from "path";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // step-1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures");

    console.log(courseProgress);

    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Step-2 If no progress found, return course details with an empty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // Step-3 Return the user's course progress alog with course details
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // fetch or create course progress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      // If no progress exist, create a new record
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // if lecture already exist, update its status
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // Add new lecture progress
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // if all lecture is complete
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    const course = await Course.findById(courseId);

    if (course.lectures.length === lectureProgressLength)
      courseProgress.completed = true;

    await courseProgress.save();

    return res.status(200).json({
      message: "Lecture progress updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as completed." });
  } catch (error) {
    console.log(error);
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgress.completed = false;
    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as incompleted." });
  } catch (error) {
    console.log(error);
  }
};

export const getCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    if (!courseProgress || !courseProgress.completed) {
      return res.status(400).json({ message: "Course is not completed yet." });
    }

    const courseDetails = await Course.findById(courseId).populate("creator");
    const currentUser = await User.findById(userId);

    console.log(courseDetails);

    const userName = currentUser.name;
    const courseName = courseDetails.courseTitle;

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${courseName.replace(/\s+/g, "_")}_Certificate.pdf`
    );

    const doc = new pdfkit({
      size: "A4",
      layout: "landscape",
      margin: 50,
    });

    doc.pipe(res);

    // Background & Border
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fdfdfd");

    doc
      .lineWidth(10)
      .strokeColor("#004aad")
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .stroke();

    doc.moveDown(2);

    // Load logo image (update the path if needed)
    const logoPath = path.resolve("./assets/logo.png");
    doc
      .image(logoPath, doc.page.width / 2 - 50, 40, { width: 100 })
      .moveDown(3);

    // LearnIT title
    doc
      .moveUp(0)
      .fontSize(24)
      .fillColor("#004aad")
      .font("Helvetica-Bold")
      .text("LearnIT", {
        align: "center",
        lineGap: 8,
      });

    // Certificate title
    doc
      .moveDown(1)
      .fontSize(40)
      .fillColor("#000000")
      .font("Helvetica-Bold")
      .text("Certificate of Completion", {
        align: "center",
        lineGap: 16,
      });

    // Description
    doc
      .moveDown(0.5)
      .fontSize(20)
      .font("Helvetica")
      .fillColor("#333333")
      .text("This certificate is proudly presented to", {
        align: "center",
      });

    // Student Name
    doc
      .moveDown(0.5)
      .fontSize(30)
      .font("Helvetica-Bold")
      .fillColor("#000000")
      .text(userName, {
        align: "center",
      });

    // Course name
    doc
      .moveDown(0.5)
      .fontSize(18)
      .font("Helvetica")
      .fillColor("#333333")
      .text(`for successfully completing the course`, {
        align: "center",
      })
      .moveDown(0.2)
      .font("Helvetica-BoldOblique")
      .fontSize(22)
      .fillColor("#004aad")
      .text(`"${courseName}"`, {
        align: "center",
      });

    // Footer area
    doc
      .moveDown(1.5)
      .fontSize(14)
      .fillColor("#666666")
      .text(
        `Issued on: ${new Date().toLocaleDateString()}\nCertificate ID: ${
          courseProgress._id
        }`,
        {
          align: "left",
          continued: true,
        }
      )
      .text(`Signature: ${courseDetails.creator.name}`, {
        align: "right",
      });

    doc
      .moveDown(1)
      .fontSize(12)
      .fillColor("#999999")
      .text("LearnIT | Empowering Online Learning", {
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Something went wrong while generating the certificate.",
      });
  }
};
