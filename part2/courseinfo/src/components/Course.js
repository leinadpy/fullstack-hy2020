import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course, index) => (
        <div key={course.id}>
          <Header text={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
