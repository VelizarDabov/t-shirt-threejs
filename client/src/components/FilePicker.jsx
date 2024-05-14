import React from "react";
import CustomBtn from "./CustomBtn";
const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-lable">
          upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No file selected" : ""}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomBtn
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyle="text-xs"
        />
        <CustomBtn
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyle="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
