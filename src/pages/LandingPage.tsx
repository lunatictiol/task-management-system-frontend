import { useNavigate } from "react-router-dom";


function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
    <div className="text-center text-white space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold">taskfy.io</h1>
      <p className="text-lg md:text-xl">Your productivity, simplified.</p>
      <button onClick={()=>{navigate("/auth")}} className="mt-4 px-6 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
        Get Started
      </button>
    </div>
  </div>
  )
}

export default LandingPage