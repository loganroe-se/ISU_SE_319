import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = ({ handleAuthToggle, userData, setUserData }) => {
    const navigate = useNavigate();
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be reversed.')) {
            try {
                // Send delete request
                const response = await fetch(`http://localhost:8081/api/users/${userData.email}`, {
                    method: 'DELETE',
                });

                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    toast.success("You have deleted your account.");
                    handleAuthToggle();
                    navigate("/");
                } else {
                    setError(`Failed to delete account: ${data.message}`);
                }
            } catch (err) {
                setError('Failed to delete account. Please try again.');
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (oldPassword && newPassword && oldPassword === newPassword) {
            setError('New password cannot be the same as the old password.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        // Reset error
        setError('');
        setIsSubmitting(true);

        // Check if the old password is correct if it was entered
        if (oldPassword !== "") {
            const isOldPasswordCorrect = await checkPassword(userData.username, oldPassword);
    
            if (!isOldPasswordCorrect) {
                setError('The old password is incorrect.');
                setIsSubmitting(false);
                return;
            }
        }

        // Call backend to perform update
        const success = await handleUpdateUser(userData.username, oldPassword, newPassword);

        if (success) {
            // Provide a toast saying update was successful
            toast.success("You have updated your account.");
        } else {
            setError('There was an error in updating the account information. Please try again.');
        }

        setIsSubmitting(false);
    };

    // Checks if the old password is right
    const checkPassword = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: username, 
                    password: password,
                }),
            })

            console.log(response);

            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    // Handle user updates
    const handleUpdateUser = async(oldUsername, oldPassword, newPassword) => {
        try {
            const updates = {};

            if (oldUsername && oldUsername !== updatedUsername) {
                updates.username = updatedUsername;
            }

            if (oldPassword && newPassword) {
                updates.password = newPassword;
            }

            // Ensure at least one field has been changed
            if (Object.keys(updates).length === 0) {
                return true;
            }

            const response = await fetch(`http://localhost:8081/api/users/${userData.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updates),
            });

            const data = await response.json();

            if (response.ok) {
                // Update user data
                setUserData({
                    username: data.username,
                    email: data.email,
                });

                // Clear the fields
                setUpdatedUsername("");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");

                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2>Update Account Information</h2><hr />

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={updatedUsername} placeholder={"Current Username: " + userData.username} onChange={(e) => setUpdatedUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Save Changes</button>
                </form>

                <hr />
                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>
        </>
    );
};

export default Account;