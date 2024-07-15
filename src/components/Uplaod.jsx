import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDragDropFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";

function UploaderComp({ onFileUpload }) {
  const onDrop = (acceptedFiles) => {
    onFileUpload(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed border-gray-400 rounded-full p-8"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <RiDragDropFill className="w-20 h-20" />
      ) : (
        <FaCloudUploadAlt className="w-20  h-20" />
      )}
    </div>
  );
}

export default UploaderComp;
