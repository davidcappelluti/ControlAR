import React from "react";
import { useParams } from "react-router-dom";
import useSingleCourse from "../hooks/useSingleCourse";
import { useStudentsByCourse } from "../hooks/useStudents";
import { NavigationLayout } from "./layout/Layout";
import { useOperations } from "../context/OperationsContext";
import { useNavigate } from "react-router-dom";
import {Button} from '../components/Button';

export const CourseAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {students} = useStudentsByCourse(id);
  const { course } = useSingleCourse(id);
  const {isCourseAttendanceReady, setIsCourseAttendanceReady} = useOperations();
  const handleCourseAttendance = () => {
    setIsCourseAttendanceReady(true);
    navigate(`/courses/${id}/attendance/process`);
  }
  return (
    <NavigationLayout empty text={course?.name}>
      <div className="p-6 w-full h-full">
        <div className="flex flex-col gap-4">
          <Button title="Tomar asistencia" onClick={handleCourseAttendance}/>
          <span>Cantidad de alumnos: {course?.students.length}</span>
          <span>Alumnos</span>
          <table className="border-2 border-gray-200">
            <tbody> 
            {students?.map((student) => {
              return (
                <tr className="border-b-2 border-gray-200" key={student.id}>
                  <td className="p-2">{student.name} {student.lastname}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </NavigationLayout>
  );
};