import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./Button";
import { useOperations } from "../context/OperationsContext";
import useCourses from "../hooks/useCourses";
import { useStudentsByCourse } from "../hooks/useStudents.jsx";
import useSingleCourse from "../hooks/useSingleCourse";
import { IoMdRemoveCircleOutline } from "react-icons/io";

import { StudentCustomInput, CustomInput } from "./CustomInput";

const BaseDialog = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center">
        {children}
      </div>
    </Dialog>
  );
};

export function AddCourseDialog({ isOpen, onClose }) {
  const { addCourse } = useOperations();
  const [courseName, setCourseName] = useState("");

  const handleAddCourse = () => {
    addCourse({ name: courseName });
    onClose();
    setCourseName("");
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <Dialog.Panel className="flex items-start flex-col gap-4 mx-auto max-w-sm p-8 rounded bg-white">
        <Dialog.Title className="text-lg font-bold">
          Añadir un curso
        </Dialog.Title>
        <input
          type="text"
          placeholder="Nombre del curso"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="rounded-lg bg-gray-100 p-2"
        />
        <div className="flex flex-row gap-4">
          <Button title="Añadir curso" onClick={handleAddCourse} />
          <Button
            title="Cancelar"
            onClick={() => onClose()}
            className="bg-gray-200 hover:bg-gray-400 text-black"
          />
        </div>
      </Dialog.Panel>
    </BaseDialog>
  );
}

export const DetailsStudentDialog = ({
  isOpen,
  onClose,
  studentId,
  student,
}) => {
  const { deleteStudent, deleteStudentFromCourse } = useOperations();
  const { course } = useSingleCourse(student?.course?.id);
  const { courses } = useCourses();
  const handleDeleteStudent = () => {
    deleteStudent(studentId, student);
  };
  const handleRemoveStudentFromCourse = () => {
    deleteStudentFromCourse(course.id, studentId, student);
  };
  
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <Dialog.Panel className="flex items-start flex-col gap-4 mx-auto max-w-sm p-8 rounded bg-white">
        <Dialog.Title className="text-lg font-bold">
          Detalles del estudiante
        </Dialog.Title>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center font-medium gap-3">
            Nombre:{" "}
            <StudentCustomInput
              text={student.name}
              studentId={studentId}
              target="name"
            />
          </div>
          <div className="flex flex-row items-center font-medium gap-3">
            Apellido:{" "}
            <StudentCustomInput
              text={student.lastname}
              studentId={studentId}
              target="lastname"
            />
          </div>
          <div className="flex flex-row items-center font-medium gap-3">
            Curso: {course?.name}
            {course && (
              <IoMdRemoveCircleOutline onClick={handleRemoveStudentFromCourse} />
            )}
          </div>
        </div>
        <Button
          title="Eliminar estudiante"
          onClick={handleDeleteStudent}
          className={"bg-red-500 text-white"}
        />
      </Dialog.Panel>
    </BaseDialog>
  );
};

export const DetailsCourseDialog = ({ isOpen, onClose, course }) => {
  const { deleteCourse, deleteStudentFromCourse } = useOperations();
  const { students } = useStudentsByCourse(course?.id);
  const handleDeleteCourse = async () => {
    await deleteCourse(course.id);
    onClose();
  };
  const handleRemoveStudent = async (student) => {
    await deleteStudentFromCourse(course.id, student.id, {
      name: student.name,
      lastname: student.lastname,
      course: { id: course.id },
    });
  };
  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <Dialog.Panel className="flex items-start flex-col sm:w-96 gap-4  p-8  rounded-xl bg-white">
        <div className="flex flex-col gap-4">
          <CustomInput text={course?.name} courseId={course?.id} />
          <h2 className="text-lg font-bold">Estudiantes</h2>
          <ul className="p-2 flex flex-col gap-2 border-2 border-gray-200 rounded-md">

            {students?.map((student) => {
              return (
                <li
                  key={student.id}
                  className="flex flex-row gap-3 items-center w-full justify-between
                  rounded-md p-4 font-medium">
                  {student.name}
                  <IoMdRemoveCircleOutline
                    className="w-6 h-6 "
                    color="#FF4040"
                    onClick={() => handleRemoveStudent(student)}
                  />
                </li>
              );
            })}
            {students?.length === 0 && (
              <li className="text-gray-400">No hay estudiantes</li>
            )}
          </ul>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Button
            title="Cerrar"
            onClick={() => onClose()}
            className="bg-gray-200 hover:bg-gray-400 text-black"
          />
          <Button
            onClick={handleDeleteCourse}
            className="bg-red-500 w-10 h-10 hover:bg-red-600"
          />
        </div>
      </Dialog.Panel>
    </BaseDialog>
  );
};

export const AddStudentDialog = ({ isOpen, onClose }) => {
  const { addStudent } = useOperations();
  const { courses } = useCourses();
  const [studentName, setStudentName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const handleAddStudent = () => {
    if (!selectedCourse || !studentName || !studentLastName) {
      alert("Por favor llene todos los campos");
      return;
    }
    addStudent({
      name: studentName,
      lastname: studentLastName,
      course: { id: selectedCourse },
    });
    clearFields();
    onClose();
  };
  const clearFields = () => {
    setStudentName("");
    setStudentLastName("");
    setSelectedCourse("");
  };
  const handleSelectCourse = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <Dialog.Panel className="flex items-start flex-col gap-4 mx-auto max-w-sm p-8 rounded bg-white">
        <Dialog.Title className="text-lg font-bold">
          Añadir un estudiante
        </Dialog.Title>
        <input
          type="text"
          placeholder="Nombre"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="rounded-lg bg-gray-100 p-2"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={studentLastName}
          onChange={(e) => setStudentLastName(e.target.value)}
          className="rounded-lg bg-gray-100 p-2"
        />
        <select
          onChange={handleSelectCourse}
          className="rounded-lg bg-gray-100 p-2"
          defaultValue={"DEFAULT"}
          title="Curso"
        >
          {courses.length === 0 ? (
            <option value={"DEFAULT"} disabled>
              No hay cursos
            </option>
          ) : (
            <option value="DEFAULT" disabled>
              Seleccione un curso
            </option>
          )}
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <div className="flex flex-row gap-4">
          <Button title="Añadir estudiante" onClick={handleAddStudent} />
          <Button
            title="Cancelar"
            onClick={() => onClose()}
            className="bg-gray-200 hover:bg-gray-400 text-black"
          />
        </div>
      </Dialog.Panel>
    </BaseDialog>
  );
};