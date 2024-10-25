import { useState } from "react";
import Button from "../components/custom/Button";
import Input from "../components/custom/Input";
import Header from "../components/sections/Header";
import Label from "../components/custom/Label";
import { CredentialService, CredentialsType, LoginResult } from "../types/credential";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentials, setCredentials] = useState<CredentialsType>({ email: "", password: "" });
  const [badCredentials, setBadCredentials] = useState<boolean>(false);

  const handleLogin = () => {
    const service = new CredentialService();

    service.login(credentials).then(result => {
      if (result === LoginResult.SUCCESS) {
        setBadCredentials(false);
        navigate("/");
      } else {
        setBadCredentials(true);
      }
    });
  }

  return (
    <div className="h-screen">
      <Header title="Login" />
      <main className="mt-10 flex sm:flex-col sm:items-center md:flex-row gap-4 justify-between items-start w-4/6 max-w-[500px] mx-auto relative">
        <form
          onSubmit={event => event.preventDefault()}
          className="flex flex-col shadow-[0_12px_20px_rgba(100,100,100,_0.3)] space-y-8 p-6 border-2 rounded-xl w-full">
          <h1 className="text-4xl text-center">Login</h1>
          {
            (badCredentials === true) ? 
            <div className="text-red-500">The credentials that you inserted are wrong or the user does not exist. </div> : 
            null
          }
          <div className="flex flex-col space-y-2">
            <Label title="Email" />
            <Input
              placeholder="john@example.com"
              type="email"
              className="w-full"
              value={email}
              setValue={value => {
                setCredentials(prevState => {
                  return {
                    ...prevState,
                    email: value
                  };
                });
                setEmail(value);
              }}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label title="Password" />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              setValue={value => {
                setCredentials(prevState => {
                  return {
                    ...prevState,
                    password: value
                  };
                });
                setPassword(value);
              }}
            />
          </div>
          <Button title="Login" onClick={handleLogin} />
        </form>
      </main>
    </div>
  );
}

export default Login;
