import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useAuthContext } from "../../../shared/context/auth-context";
import { login } from "../services/auth.service";
import { AuthShell } from "./AuthShell";
import { Field, AuthInput, SubmitButton } from "./auth-primitives";

const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { persistAuth } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      persistAuth(response.token, response.user);
      navigate({ to: "/dashboard" });
    } catch {
      setError("root", { message: "Invalid email or password" });
    }
  };

  return (
    <AuthShell
      footer={
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-teal-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {errors.root && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-lg p-3 bg-red-50 border border-red-200 text-sm text-red-600"
          >
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            {errors.root.message}
          </div>
        )}

        <Field
          label="Email"
          error={errors.email?.message}
          errorId="email-error"
        >
          <AuthInput
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            hasError={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>

        <Field
          label="Password"
          error={errors.password?.message}
          errorId="password-error"
        >
          <div className="relative">
            <AuthInput
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              hasError={!!errors.password}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IoEyeOff className="w-5 h-5" />
              ) : (
                <IoEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </Field>

        <SubmitButton
          loading={isSubmitting}
          label="Sign in"
          loadingLabel="Signing in…"
        />
      </form>
    </AuthShell>
  );
}
