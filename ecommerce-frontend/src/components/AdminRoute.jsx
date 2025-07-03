
import React from 'react'
import { useAuthStore } from '../store/useAuthStote';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user } = useAuthStore();

    if (!user) return <Navigate to="/login" />
    if (user.role !== "admin") return <Navigate to="/" />
    return children;
}

export default AdminRoute
