import { useState } from "react";
import './Header.css'

function File({ children }) {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };
  return (
    <>
      <div className="header">
        <h1>Draw or Upload .geojson Polyline and Get Information</h1>

        <input type="file" onChange={handleChange} />
        <br />
        {files}
      </div>
    </>
  );
}

export default File