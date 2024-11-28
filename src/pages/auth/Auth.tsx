import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { handleAuth } from "../../api/api";


const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await handleAuth(email,password,isRegister)
      const token  = response.token
      const userId  = response.userId
      console.log(response); // Handle the response
      dispatch(login({token:token,userId:userId }));
      setIsLoading(false);
      alert(isRegister ? "Registered Successfully!" : "Logged in Successfully!");
      navigate("/dashboard")

    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        {!isLoading? <><h2 className="text-2xl font-bold text-center">
          {isRegister ? "Register" : "Login"}
        </h2><form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); } }
                value={email}
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassoword(e.target.value); } }
                value={password}
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form><p className="text-sm text-center text-gray-600">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegister((prev) => !prev)}
              className="font-medium text-indigo-600 hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p></>:
          <p>
            is Loading
            </p>}
      </div>
    </div>
  );
};

export default AuthPage;
