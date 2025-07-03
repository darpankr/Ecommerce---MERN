import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStote';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
    const { user, getUserProfile, updateUserProfile } = useAuthStore();
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                await getUserProfile();
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, password: '' });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData);
            toast.success("Profile updated successfully");
        } catch (err) {
            console.log(err);
            toast.error("Failed to update profile");
        }
    };

    if (loading) return <p className="text-center">Loading profile...</p>;

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label>Email:</label>
                    <input value={user?.email} disabled className="w-full border px-2 py-1" />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-2 py-1"
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-2 py-1"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
