import React from "react";
import "./courses.css";

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.name} className="course-image" />
      <div className="course-info">
        <h3>{course.name}</h3>
        <p>
          <b>Instructor:</b> {course.instructor}
        </p>
        <p>
          <b>Release Date:</b> {course.release_date}
        </p>
        <p className="course-price">${course.price}</p>
        <button className="enroll-btn">Enroll Now</button>
      </div>
    </div>
  );
}
