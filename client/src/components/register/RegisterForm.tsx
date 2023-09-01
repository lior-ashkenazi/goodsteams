import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";

import { useRegisterUserMutation } from "../../store";

import { isAuthError } from "../../types/errors/authErrors";

const registerFormValidationSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(200, { message: "Username exceeded 200 characters" })
      .refine((username) => !/\s/.test(username), {
        message: "Username cannot contain whitespace characters",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is not valid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type RegisterFormValidationSchema = z.infer<
  typeof registerFormValidationSchema
>;

const textFieldTheme = createTheme({
  palette: {
    primary: {
      main: "#451a03",
    },
  },
});

const LoginForm = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValidationSchema>({
    resolver: zodResolver(registerFormValidationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<RegisterFormValidationSchema> = async (
    data,
  ) => {
    const { username, email, password } = data;
    const userCredentials = { username, email, password };
    try {
      await registerUser(userCredentials).unwrap();
      navigate("/store");
    } catch (error) {
      if (error && typeof error === "object" && isAuthError(error)) {
        const msg = error.data.message;
        if (error.data.message.startsWith("Username")) {
          setError("username", { type: "manual", message: msg });
        } else if (error.data.message.startsWith("Email")) {
          setError("email", { type: "manual", message: msg });
        }
      }
    }
  };

  return (
    <form
      className="flex w-[32rem] flex-col gap-y-16 rounded bg-green-500 p-10"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2 className="text-5xl font-semibold">Sign Up</h2>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-6 pr-6">
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              {...(errors.username ? { error: true } : {})}
              className="rounded-sm bg-white"
              id="username-input"
              label="Username"
              autoComplete="on"
              placeholder="Enter Username"
              {...register("username")}
              helperText={errors.username ? errors.username?.message : " "}
              FormHelperTextProps={{
                style: {
                  background: "#22c55e",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                },
              }}
            />
            <TextField
              {...(errors.email ? { error: true } : {})}
              className="rounded-sm bg-white"
              id="email-input"
              label="Email"
              autoComplete="on"
              placeholder="Enter Email"
              {...register("email")}
              helperText={errors.email ? errors.email?.message : " "}
              FormHelperTextProps={{
                style: {
                  background: "#22c55e",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                },
              }}
            />
            <TextField
              {...(errors.password ? { error: true } : {})}
              className="rounded-sm bg-white"
              id="password-input"
              label="Password"
              type="password"
              autoComplete="off"
              placeholder="Enter Password"
              {...register("password")}
              helperText={errors.password ? errors.password?.message : " "}
              FormHelperTextProps={{
                style: {
                  background: "#22c55e",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                },
              }}
            />
            <TextField
              {...(errors.confirmPassword ? { error: true } : {})}
              className="rounded-sm bg-white"
              id="confirm-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="off"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              helperText={
                errors.confirmPassword ? errors.confirmPassword?.message : " "
              }
              FormHelperTextProps={{
                style: {
                  background: "#22c55e",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                },
              }}
            />
          </ThemeProvider>
        </div>
        <span className="flex justify-center">
          <Button
            variant="contained"
            className="h-16 w-40 bg-amber-400 text-lg hover:bg-amber-500"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </span>
        <span className="flex items-center justify-center text-lg font-medium">
          Have an account already?{" "}
          <Button
            variant="text"
            className="py-0 pl-2 pr-0 text-lg text-amber-200"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
