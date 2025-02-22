import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function StudentDetails() {
    const { id } = useParams(); // Destructure `id` directly from `useParams`
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/students/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setStudent(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/students/send-email/${id}`,
                {
                    subject: "Welcome to our platform",
                    message: "Dear student, we are excited to have you on our platform.",
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                alert('Email sent successfully');
            }
        } catch (err) {
            alert('Failed to send email: ' + err.message);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]); // Add `id` to the dependency array

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-red-500 text-2xl">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-4">{student?.name}</h1>
                <h2 className="text-xl text-gray-300 mb-6">{student?.email}</h2>
                <button
                    onClick={sendEmail}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Send Email
                </button>
            </div>
        </div>
    );
}