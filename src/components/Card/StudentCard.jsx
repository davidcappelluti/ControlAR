import React from "react";
import { DetailsStudentDialog } from "../Dialog";

const StudentCard = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className="bg-gray-100 p-5 rounded-lg hover:bg-gray-200 shadow-md"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <h2 className="text-lg font-medium">
        {props.name} {props.lastname}
      </h2>
      <DetailsStudentDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        studentId={props.id}
        student={{
          name: props.name,
          lastname: props.lastname,
          course: {
            id: props.course?.id,
          },
        }}
      />
    </div>
  );
};

export default StudentCard;