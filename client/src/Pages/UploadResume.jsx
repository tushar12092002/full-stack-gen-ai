import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UploadResume = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('/api/parse-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Resume uploaded and parsed successfully!');
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume.');
        }
    };

    return (
        <div>
            <h1>Upload Resume</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadResume;
