import { motion } from "framer-motion";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "./Button";

export const ActionBar = ({ openDialog, name }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-row justify-between items-center p-4 px-10"
    >
      <Button
        title={`Añadir ${name}`}
        onClick={() => {
          openDialog();
        }}
        className="h-10 bg-transparent
        text-blue-500
        border-blue-500 hover:bg-blue-500 hover:text-white border-2 transition-all ease-in-out duration-200"
      />

      <p className="flex flex-row items-center gap-2 w-5/12 p-2 shadow-sm rounded-md">
        <span>
          <AiOutlineSearch className="w-6 h-6" />
        </span>
        Buscar
      </p>
    </motion.div>
  );
};

export const CourseActionBar = ({ openDialog }) => {
  return <ActionBar openDialog={openDialog} name="Curso" />;
};
export const StudentActionBar = ({ openDialog }) => {
  return <ActionBar openDialog={openDialog} name="Estudiante" />;
};
