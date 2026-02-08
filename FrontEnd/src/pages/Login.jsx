import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password");
    }
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "360px" }}>
        <h4 className="text-center mb-4">Sign in</h4>

        {error && (
          <div className="alert alert-danger py-1">{error}</div>
        )}

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;