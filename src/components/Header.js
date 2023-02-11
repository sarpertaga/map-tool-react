import React, { useState } from "react";
import "./Header.css";
import geo from './Map.js'

function Header() {
  // const geojson = useState({
  //     'type': 'FeatureCollection',
  //     'features': [{
  //       'type': 'Feature',
  //               'geometry': {
  //                   'type': 'LineString',
  //                   'coordinates': []
  //               }
  //     }]
  // })

  const exportData = () => {
    const jsonString = `geojson:text/json;chatset=utf-8,${encodeURIComponent(geo)
    }`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "geojson.json";

    link.click();
  };

  return (
    <div className="header">
      <button type="button" onClick={exportData}>
        Export .geojson File
      </button>
    </div>
  );
}

export default Header


// import {useState} from "react";
// import './Header.css'
// import axios from "axios";

// function Header() {
//     const [file, setFile] = useState()

//   function handleChange(event) {
//     setFile(event.target.files[0])
//   }
  
//   function handleSubmit(event) {
//     event.preventDefault()
//     const url = 'http://localhost:3000/uploadFile';
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileName', file.name);
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     axios.post(url, formData, config)
//       .then((response) => {
//         //console.log(response);
//     });

  
//   return (
//     <div className='header'>
// //       <h1>Draw or Upload .geojson Polyline and Get Information</h1>

// //       <input type="file" onChange={handleChange} />

// //       <div>{file && `${file.name} - ${file.type}`}</div>

// //       <button onClick={handleSubmit}>Upload</button>
// //     </div>
// //   );
//     )
//   }
// }

// export default Header;

