
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStote';

const NavBar = () => {
    const { user, logout } = useAuthStore();
    const handleLogOut = () => {
        logout();
        window.location.href = "/"
    }
    return (
        <nav className="bg-white py-4 my-6 px-8 flex justify-center">
            <div className='flex-auto'>
                <ul className="flex gap-6 text-lg justify-center font-medium">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {user ? (user.role === 'admin' ? (<li><Link to="/dashboard">Dashboard</Link></li>) : (<li><Link to="/bag">Bag</Link></li>)) : (<li></li>)}
                </ul>
            </div>
            <div className='flex-1'>
                {user ? (
                    <div className=" flex justify-center items-center gap-2">
                        <span>{user.name}</span>
                        <button className='py-1 px-4 bg-black text-white rounded-sm' onClick={handleLogOut}>Logout</button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-2">
                        <Link to="/login" className='bg-black py-1 px-4 rounded-sm text-white'>SignIn</Link>
                    </div>
                )}
            </div>

        </nav >
    )
}

export default NavBar
