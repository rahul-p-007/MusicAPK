// Import necessary hooks and utilities
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth(); // Get the getToken function from Clerk to fetch the current user's auth token
  const [loading, setLoading] = useState(true);

  const { checkAdminStatus } = useAuthStore();

  // Function to set or clear the Authorization header in axios
  const updateApiToken = async (token: string | null) => {
    if (token) {
      // If a token exists, set it as a Bearer token in the Authorization header
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      // If no token, remove the Authorization header
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  };

  // useEffect runs after the first render to initialize authentication
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to get the auth token from Clerk
        const token = await getToken();
        // Set the token in axios headers
        updateApiToken(token);

        // Check for the admin
        if (token) {
          await checkAdminStatus();
        }
      } catch (error) {
        // If token fetching fails, clear the Authorization header
        updateApiToken(null);
        console.log("Error in initAuth", error);
      } finally {
        // Mark loading as complete
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  // If loading is true, show a full-screen centered spinner
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  // Once loading is false, render the children components (actual app)
  return <div>{children}</div>;
}

export default AuthProvider;
