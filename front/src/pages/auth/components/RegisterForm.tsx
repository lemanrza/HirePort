import EyeIcon from "./EyeIcon"

const RegisterForm = ({ active, registerTab, setRegisterTab, showRegisterUserPassword, setShowRegisterUserPassword, showRegisterUserConfirm, setShowRegisterUserConfirm }: any) => {
    return (
        <>
            <div
                className={`w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-6 md:px-12 py-10 transition-all duration-700 z-20 ${active ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 md:block hidden"
                    }`}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
                    Join Us
                </h2>

                {/* Tabs */}
                <div className="flex mb-6 space-x-4">
                    <button
                        onClick={() => setRegisterTab("user")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${registerTab === "user"
                            ? "bg-green-900 text-white scale-105 shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setRegisterTab("company")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${registerTab === "company"
                            ? "bg-green-900 text-white scale-105 shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        Company
                    </button>
                </div>

                {/* User Register */}
                {registerTab === "user" ? (
                    <form className="w-full max-w-sm space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                        />
                        <div className="relative">
                            <input
                                type={showRegisterUserPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRegisterUserPassword((s: any) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <EyeIcon open={showRegisterUserPassword} />
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showRegisterUserConfirm ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRegisterUserConfirm((s: any) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <EyeIcon open={showRegisterUserConfirm} />
                            </button>
                        </div>
                        <button className="w-full bg-green-900 text-white py-3 rounded-full font-semibold hover:bg-green-800 transition">
                            Register as User
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
                                Sign up with Google
                            </span>
                        </button>
                    </form>
                ) : (
                    // Company Register
                    <form className="w-full max-w-sm space-y-5">
                        <input
                            type="email"
                            placeholder="Company Email"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="HR Name"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="HR Phone Number"
                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                        />
                        <button className="w-full bg-green-900 text-white py-3 rounded-full font-semibold hover:bg-green-800 transition">
                            Register as Company
                        </button>
                    </form>
                )}
            </div>
        </>
    )
}

export default RegisterForm