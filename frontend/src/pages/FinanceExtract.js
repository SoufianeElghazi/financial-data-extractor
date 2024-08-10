import React, { useState } from 'react';
import { extractData } from '../services/api';
import Preload from '../components/Preload';

const FinanceExtract = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [markedImagePath, setMarkedImagePath] = useState('');


  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    resetState();
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    resetState();  // Clear previous data when a new file is selected
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please upload a file first.');
      setStatusMessage('No file uploaded.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setStatusMessage('Extracting data...');

    try {
      const response = await extractData(formData);
      console.log(response); 
      setExtractedData(response.data); // Assuming response.data contains the structured data
      setMarkedImagePath(response.marked_image_path);  // Assuming the path is sent back in the response
      setStatusMessage('Data extracted successfully.');
      setLoading(false);
    } catch (err) {
      setError('Failed to extract data: ' + err.message);
      setStatusMessage('');
      setLoading(false);
    }
  };

  const resetState = () => {
    setExtractedData(null);
    setError(null);
    setStatusMessage('');
  };

  return (
    <div className="container mx-auto p-4 mt-36 mb-36 flex">
      <div className="w-full md:w-1/2">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('fileInput').click()}
          className="border-4 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
        >
          <div className="modal-body">
            <p className="modal-title text-xl font-bold">Drag Your Financial Report PDF</p>
            <p className="modal-description text-teal-300">Attach the file below</p>
            <button className="upload-area">
              <span className="upload-area-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="35"
                  height="35"
                  viewBox="0 0 340.531 419.116"
                >
                  <g id="files-new">
                    <path
                      d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                      transform="translate(2944 428)"
                      fill="var(--c-action-primary)"
                    ></path>
                  </g>
                </svg>
              </span>
              <span className="upload-area-title">Drag file(s) here to upload.</span>
              <span className="upload-area-description">
                Alternatively, you can select a file by <br /><strong>clicking here</strong>
              </span>
            </button>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
            />
            {fileName && <p className="text-orange-300 mt-4">File: {fileName}</p>}
          </div>
        </div>
          <button
            onClick={handleExtract}
            className="bg-teal-800 text-white m-1 px-6 py-3 rounded-md shadow-md hover:bg-teal-900 transition duration-300"
          >
            Extract
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {statusMessage && <p className="text-teal-300 mt-2">{statusMessage}</p>}
      </div>

      <div className="w-full md:w-1/2 bg-teal-950 p-4 rounded text-white ml-4">
        {loading ? (
          <Preload />
        ) : extractedData ? ( 
          <div>
            <h2 className="text-xl font-bold mb-4">Extracted Data</h2>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 text-white border-b-2 border-white bg-teal-900 text-left text-xs font-semibold  uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-5 py-3 text-white border-b-2 border-white bg-teal-900 text-left text-xs font-semibold uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(extractedData).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-teal-850 text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-white whitespace-no-wrap">
                            {key}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-teal-850 text-sm">
                      <p className="text-white whitespace-no-wrap">{value}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {markedImagePath && (
              <img 
                src={markedImagePath} 
                alt="Marked PDF" 
                style={{ 
                  marginTop: '20px', 
                  maxWidth: '100%', 
                  display: markedImagePath ? 'block' : 'none' 
                }} 
              />
            )}
          </div>
        ) : (
          <p>Please upload a file and click Extract to see the extracted data.</p>
        )}
      </div>
    </div>
  );
};

export default FinanceExtract;