import React from "react";
import Part from "./Part";
import Header from "./Header";
import Total from "./Total";
const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);  
  return (
    <div>
    <Header name={course.name} />
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    <Total total={total} />  
    </div>
  );
};

export default Course;
