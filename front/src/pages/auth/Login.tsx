import { useState } from "react";
import CTApanel from "./components/CTApanel";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const LoginPage = () => {
    const [active, setActive] = useState(false);
    const [loginTab, setLoginTab] = useState<"user" | "company">("user");
    const [registerTab, setRegisterTab] = useState<"user" | "company">("user");

    const [showLoginUserPassword, setShowLoginUserPassword] = useState(false);
    const [showLoginCompanyPassword, setShowLoginCompanyPassword] = useState(false);
    const [showRegisterUserPassword, setShowRegisterUserPassword] = useState(false);
    const [showRegisterUserConfirm, setShowRegisterUserConfirm] = useState(false);



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="relative w-full max-w-9xl min-h-screen md:h-[100vh] flex flex-col md:flex-row overflow-hidden bg-white">
                {/* Left Decorative Panel */}
                <div
                    className="hidden md:flex absolute top-0 left-0 w-1/2 h-full bg-green-900"
                    style={{ clipPath: "polygon(0 0, 95% 0, 65% 100%, 0% 100%)" }}
                ></div>

                {/* Right Decorative Panel */}
                <div
                    className="hidden md:flex absolute top-0 right-0 w-1/2 h-full bg-green-900 transition-all duration-700"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)" }}
                ></div>

                {/* Login Form */}
                <LoginForm
                    active={active}
                    loginTab={loginTab}
                    setLoginTab={setLoginTab}
                    showLoginUserPassword={showLoginUserPassword}
                    setShowLoginUserPassword={setShowLoginUserPassword}
                    showLoginCompanyPassword={showLoginCompanyPassword}
                    setShowLoginCompanyPassword={setShowLoginCompanyPassword}
                />

                {/* Register Form */}
                <RegisterForm
                    active={active}
                    registerTab={registerTab}
                    setRegisterTab={setRegisterTab}
                    showRegisterUserPassword={showRegisterUserPassword}
                    setShowRegisterUserPassword={setShowRegisterUserPassword}
                    showRegisterUserConfirm={showRegisterUserConfirm}
                    setShowRegisterUserConfirm={setShowRegisterUserConfirm}
                />

                {/* CTA Panels */}
                <CTApanel active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default LoginPage;
