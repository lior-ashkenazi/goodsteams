import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/store");
  };
  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginPage;
