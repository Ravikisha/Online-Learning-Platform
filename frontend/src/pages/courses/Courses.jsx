import React from "react";
import data from "./Courses.json";
import CourseCard from "./CourseCard";
import "./courses.css";
import Navbar from "../../nav/Navbar";

export default function Courses() {
  return (
    <>
      <Navbar />
      <div className="courses-container">
        <h1>Available Courses</h1>
        <div className="courses-grid">
          {data.SampleCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
