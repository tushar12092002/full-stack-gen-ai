import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch all resumes
  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resumes');
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
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume');
    }
  };

  // Handle file deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${id}`);
      setResumes(resumes.filter((resume) => resume.id !== id));
      alert('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">HR Dashboard</h1>

      {/* File Upload Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      {/* Resume List Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Uploaded Resumes</h2>
        {resumes.length === 0 ? (
          <p className="text-gray-400">No resumes uploaded yet.</p>
        ) : (
          <ul>
            {resumes.map((resume) => (
              <li key={resume.id} className="mb-4 p-4 bg-gray-800 rounded-lg flex justify-between items-center">
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
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;