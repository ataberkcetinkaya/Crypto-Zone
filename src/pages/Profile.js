import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    
    useEffect(() => {
        const savedUrl = localStorage.getItem('uploadedImage');
        if (savedUrl) {
            setUploadedUrl(savedUrl);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!selectedFile) {
          alert('Please select a file first!');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append("upload_preset", process.env.REACT_APP_IMAGE_SECRET);

        const cloudName = process.env.REACT_APP_IMAGE_SECRET_2;

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            const imageUrl = response.data.secure_url;

            setUploadedUrl(imageUrl);
            localStorage.setItem('uploadedImage', imageUrl);
          } catch (error) {
            console.error('Error:', error);
            alert('Upload failed');
          }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
    }

  return (
    <div className='mainPart'>
        <h1 style={{ color: 'yellow', fontSize: '50px', marginBottom: '20px' }}>Hello, User!</h1>
        <h2 style={{ color: 'white', marginBottom: '10px' }}>Upload Your Profile Photo</h2>
        <Link to="/"><button className="backButton" >Home</button></Link>
        <form onSubmit={handleSubmit}>
            <input style={{ color: 'white' }} type="file" onChange={handleFileChange} />
            <button style={{ color: 'white', border: '1px solid white', borderRadius: '5px', padding: '5px' }} type="submit">
                Upload
            </button>
        </form>

        {uploadedUrl && (
            <div>
                <img className="profilePic" src={uploadedUrl} alt="Uploaded" width="200" />
            </div>
        )}
    </div>
  )
}
