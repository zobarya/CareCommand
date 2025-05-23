
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page
    navigate("/", { replace: true });
  }, [navigate]);
  
  return <LoginPage />;
};

export default Index;
