import { useLocation } from "react-router-dom";

const CompanyProfile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showModal = params.get("setPassword") === "true";

  return (
    <div>
      <h1>Company Profile</h1>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          {/* Modal content */}
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="font-bold mb-4">Set New Password</h2>
            {/* input + save button */}
          </div>
        </div>
      )}
    </div>
  );
};
export default CompanyProfile;  