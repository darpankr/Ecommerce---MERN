
import { useAuthStore } from "../store/useAuthStote"

const Home = () => {
    const { user } = useAuthStore();
    return (
        <div className='bg-white text-black mx-auto flex flex-col justify-center items-center space-y-4'>
            <div className='size-80 flex flex-col justify-center items-center bg-amber-100'>
                {/* <div>Welcome to Home Page</div> */}
                {user ? (
                    <p className="text-lg flex flex-col justify-center items-center">
                        <span className="font-semibold">👋 Welcome, {user.name}</span>
                        <span className="text-gray-600">{user.email}</span>
                    </p>
                ) : (
                    <p className="text-lg text-red-500">You are not logged in.</p>
                )}
            </div>
            {/* <Link to='/login' className='py-1 px-4 bg-black rounded-sm text-white font-sans'>Login</Link>
            <Link to='/register' className='py-1 px-4 bg-black rounded-sm text-white font-sans'>Register</Link> */}
        </div>
    )
}

export default Home
