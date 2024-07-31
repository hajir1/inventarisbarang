import React from "react";

export const ButtonCard = ({ model, handleClick, style }) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-lg border border-gray-400 py-2 px-2 lg:py-2 lg:px-6 text-center align-middle text-xs font-bold  text-gray-600 transition-all hover:opacity-75 font-mono uppercase tracking-wider lg:w-[30%] ${style}`}
      type="button"
    >
      {model}
    </button>
  );
};
