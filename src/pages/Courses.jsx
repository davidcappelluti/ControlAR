import React from "react";
import { Link } from "react-router-dom";
import { ActionBar } from "../components/ActionBar";
import { CourseCard } from "../components/CourseCard";
import { NavigationBar } from "../components/NavigationBar";
import { UserAuth } from "../context/AuthContext";
import useCourses from "../hooks/useCourses";
import CourseDialog from "../components/CourseDialog";
export default function Courses() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  
  const { LogOut, user } = UserAuth();
  const { courses } = useCourses();
  return (
    <div>
      <NavigationBar />
      <ActionBar openDialog={()=>{setIsDialogOpen(true)}}/>
      <CourseDialog isOpen={isDialogOpen}/>
      {console.log(isDialogOpen)}
      {courses.map((course)=>{
        return <CourseCard {...course}/>
      })}

      {courses.length === 0 && <h1 className="text-center text-2xl">No Courses</h1>}
    </div>
  );
}