import logo from "../../../assets/hireport_logo.png";

const CTApanel = ({ active, setActive }: any) => {
    return (
        <>
            {!active && (
                <div className="hidden md:flex absolute right-0 top-0 w-1/2 h-full flex-col justify-center items-center text-white z-30 px-12 text-center">
                    <div className="w-32 md:w-40 mb-4 bg-white p-2 rounded">
                        <img src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">New Here?</h1>
                    <p className="mb-6 text-sm md:text-base max-w-sm">
                        Create your account and start exploring job opportunities or post
                        your first vacancy today.
                    </p>
                    <button
                        onClick={() => setActive(true)}
                        className="px-6 md:px-8 py-3 bg-white text-green-800 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
                    >
                        Register
                    </button>
                </div>
            )}
            {active && (
                <div className="hidden md:flex absolute left-0 top-0 w-1/2 h-full flex-col justify-center items-center text-white z-30 px-12 text-center">
                    <div className="w-32 md:w-40 mb-4 bg-white p-2 rounded">
                        <img src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">
                        Already With Us?
                    </h1>
                    <p className="mb-6 text-sm md:text-base max-w-sm">
                        Log in to continue your journey — manage your profile, apply for
                        jobs, or review candidates.
                    </p>
                    <button
                        onClick={() => setActive(false)}
                        className="px-6 md:px-8 py-3 bg-white text-green-800 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
                    >
                        Login
                    </button>
                </div>
            )}
        </>
    )
}

export default CTApanel