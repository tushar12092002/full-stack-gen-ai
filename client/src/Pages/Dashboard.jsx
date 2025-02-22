import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch all resumes
  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('resume', selectedFile);
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResumes([...resumes, response.data]);
      alert('Resume uploaded successfully');
  
      // Redirect to the Resume page with the uploaded resume ID
      navigate('/resume', { state: { resumeId: response.data.id } });
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume');
    }
  };

  // Handle file deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/resumes/${id}`);
      setResumes(resumes.filter((resume) => resume.id !== id));
      alert('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      {/* Dashboard Content */}
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500 text-center">HR Dashboard</h1>

        {/* File Upload Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Upload Resume</h2>
          <div className="flex flex-col items-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Resume List Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Uploaded Resumes</h2>
          {resumes.length === 0 ? (
            <p className="text-gray-400 text-center">No resumes uploaded yet.</p>
          ) : (
            <ul className="space-y-4">
              {resumes.map((resume) => (
                <li
                  key={resume.id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{resume.filename}</p>
                    <a
                      href={`http://localhost:5000/uploads/${resume.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      View Resume
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;