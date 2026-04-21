import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginPayload } from "~/lib/interfaces/auth";
import { userLogin } from "~/services/auth/authService";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkRemember, setCheckRemember] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();

  const userLoginMutation = useMutation({
    mutationKey: ["user-login"],
    mutationFn: async ({ payload }: { payload: loginPayload }) => {
      const res = await userLogin({ payload });
      return res?.data;
    },
    onSuccess(data) {
      const tokens = data.token;
      Cookies.set("token", tokens.access_token);
      Cookies.set("refresh_token", tokens.refresh_token);
      localStorage.setItem("user_details", JSON.stringify(data?.data, null, 2));
      navigate({ to: "/dashboard" });
    },
    onError(error) {
      if (error?.status === 401 || error?.status === 402) {
        const errors = error?.data.data;
        const passwordError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "password",
        )?.[0];
        toast.error(passwordError);
      }
      if (error?.status === 422) {
        const errors = error?.data.data;
        const errorMessage = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "email",
        )?.[0];
        const passwordError = errors?.filter(
          (eachError: { key: string; message: string }) =>
            eachError.key === "password",
        )?.[0];
        setEmailErrorMessage(errorMessage?.message);
        setPasswordErrorMessage(passwordError?.message);
      }
    },
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload: loginPayload = {
      email: email.trim(),
      password: password.trim(),
    };
    await userLoginMutation.mutateAsync({ payload });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-105 min-h-screen bg-blue-600 p-12 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl">✦</span>
          <span className="text-white font-semibold text-lg tracking-wide">
            PathZen
          </span>
        </div>
        <div>
          <p className="text-blue-100 text-3xl font-light leading-snug">
            Learning that adapts <br />
            <span className="text-white font-semibold">to you.</span>
          </p>
          <p className="text-blue-200 text-sm mt-4 leading-relaxed">
            Your personalized path to knowledge starts here.
          </p>
        </div>
        <p className="text-blue-300 text-xs">
          © 2025 PathZen. All rights reserved.
        </p>
      </div>

      <div className="flex flex-1 justify-center items-center bg-white px-8">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400">
              Sign in to continue learning
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                Email
              </label>
              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                className="h-11 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {emailErrorMessage && !email ? (
                <p className="text-red-500 text-xs">{emailErrorMessage}</p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="h-11 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordErrorMessage && !password ? (
                <p className="text-red-500 text-xs">{passwordErrorMessage}</p>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={checkRemember}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCheckRemember(e.target.checked)
                  }
                  className="w-4 h-4 accent-blue-600"
                />
                <label className="text-sm text-slate-500">Remember me</label>
              </div>
              <Button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 bg-transparent p-0 shadow-none font-medium transition-colors"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg tracking-wide transition-all duration-200"
              type="submit"
              disabled={userLoginMutation.isPending}
            >
              {userLoginMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="flex justify-center items-center">
            <p>Create New Account?</p>
            <Button
              onClick={() => navigate({ to: "/register" })}
              className="bg-transparent text-blue-600 text-md"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
