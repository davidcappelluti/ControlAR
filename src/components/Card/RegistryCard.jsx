import React from "react";
import { IconButton } from "../Button";
import { BsFillTrashFill } from "react-icons/bs";
import { motion } from "framer-motion";

export const RegistryCard = (props) => {
  const handleOpenRegistry = (e) => {
    e.stopPropagation()
    props.openRegistry(props.id);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleOpenRegistry}
      className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-row justify-between items-center hover:bg-gray-200 transition-colors duration-300  "
    >
      <h1 className="font-medium text-lg">
        Registro {props.date.toDate().toLocaleDateString()}
      </h1>
      <IconButton
        icon={<BsFillTrashFill color="#fff" className="w-4 h-4" />}
        className="bg-red-500 
          hover:bg-red-600 rounded-lg w-8 h-8 flex items-center justify-center"
      />
    </motion.div>
  );
};