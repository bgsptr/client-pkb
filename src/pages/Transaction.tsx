import React, { useState } from 'react';

const Transaction = () => {
    const [baseUrl] = useState("http://localhost:5000");
    const [token] = useState(localStorage.getItem("token"));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(token);
        const fileInput = document.querySelector('.file');
        const files = fileInput.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        fetch(baseUrl + "/uploads", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="file" multiple className="file" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Transaction;
