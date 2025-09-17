import EyeIcon from './EyeIcon'

const LoginForm = ({ active, loginTab, setLoginTab, showLoginUserPassword, setShowLoginUserPassword, showLoginCompanyPassword, setShowLoginCompanyPassword }: any) => {
    return (
        <>
            <div
                className={`w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-6 md:px-12 py-10 transition-all duration-700 z-20 ${active ? "-translate-x-full opacity-0 md:block hidden" : "translate-x-0 opacity-100"
                    }`}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
                    Sign In
                </h2>

                {/* Tabs */}
                <div className="flex mb-6 space-x-4">
                    <button
                        onClick={() => setLoginTab("user")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${loginTab === "user"
                                ? "bg-green-900 text-white scale-105 shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setLoginTab("company")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${loginTab === "company"
                                ? "bg-green-900 text-white scale-105 shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        Company
                    </button>
                </div>

                {/* User Login */}
                {loginTab === "user" ? (
                    <form className="w-full max-w-sm space-y-5">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full focus:ring-2 focus:ring-green-700 outline-none transition placeholder-gray-500"
                        />
                        <div className="relative">
                            <input
                                type={showLoginUserPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full focus:ring-2 focus:ring-green-700 outline-none transition placeholder-gray-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowLoginUserPassword((s: any) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <EyeIcon open={showLoginUserPassword} />
                            </button>
                        </div>
                        <button className="w-full bg-green-900 text-white py-3 rounded-full font-semibold hover:bg-green-800 transition">
                            Login as User
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
                        >
                            <img
                                src="https://img.icons8.com/color/48/google-logo.png"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span className="text-gray-700 font-medium">
                                Sign in with Google
                            </span>
                        </button>
                    </form>
                ) : (
                    // Company Login
                    <form className="w-full max-w-sm space-y-5">
                        <input
                            type="email"
                            placeholder="Company Email"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full focus:ring-2 focus:ring-green-700 outline-none transition placeholder-gray-500"
                        />
                        <div className="relative">
                            <input
                                type={showLoginCompanyPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full focus:ring-2 focus:ring-green-700 outline-none transition placeholder-gray-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowLoginCompanyPassword((s: any) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <EyeIcon open={showLoginCompanyPassword} />
                            </button>
                        </div>
                        <button className="w-full bg-green-900 text-white py-3 rounded-full font-semibold hover:bg-green-800 transition">
                            Login as Company
                        </button>
                    </form>
                )}
            </div>
        </>
    )
}

export default LoginForm