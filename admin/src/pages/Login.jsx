import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      // show toast
      alert("Email and Password is required!");
      return;
    }

    // api call to server
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (!data.success) {
        // show toast
        alert(data.error);
        return;
      }
      if (data.data.user.role !== "admin") {
        // show toast
        alert("You are not an admin!");
        return;
      }
      const token = data.data.accessToken;
      const refToken = data.data.refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refToken", refToken);
      window.location.href = "/";
    } catch (error) {
      console.log("Error - ", error);
      // show toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={submitHandler} className="rounded w-[260px] border border-gray-300 p-5 shadow-md flex flex-col gap-2">
        <h1 className="font-bold text-3xl text-center mb-3 login-font">Login</h1>
        <InputField
          value={formState.email}
          update={setFormState}
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <InputField
          value={formState.password}
          update={setFormState}
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <div>
          <button
            disabled={loading}
            className="cursor-pointer outline-none bg-blue-500 text-white w-full rounded text-sm py-1 font-semibold disabled:bg-gray-500 disabled:cursor-progress"
          >
            {loading ? "loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ value, update, label, type, placeholder }) => {
  return (
    <div className="flex justify-between items-end gap-2">
      <span className="text-[12px]">{label}</span>
      <InputBox value={value} update={update} type={type} placeholder={placeholder} />
    </div>
  );
};

const InputBox = ({ value, update, type, placeholder }) => {
  return (
    <input
      value={value}
      name={type}
      onChange={(e) => update((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded text-[12px] p-1"
    />
  );
};

export default Login;
