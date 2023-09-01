import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";

import { useLoginUserMutation } from "../../store";

import { isAuthError } from "../../types/errors/authErrors";

const loginFormValidationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValidationSchema = z.infer<typeof loginFormValidationSchema>;

interface LoginFormsProps {
  onSubmit: () => void;
  // onClickChangeForm: () => void;
}

const textFieldTheme = createTheme({
  palette: {
    primary: {
      main: "#451a03",
    },
  },
});

const LoginForm = ({ onSubmit }: LoginFormsProps) => {
  const [loginUser] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValidationSchema>({
    resolver: zodResolver(loginFormValidationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<LoginFormValidationSchema> = async (
    data,
  ) => {
    const { username, password } = data;
    const userCredentials = { username, password };
    try {
      await loginUser(userCredentials).unwrap();
      onSubmit();
    } catch (error) {
      if (error && typeof error === "object" && isAuthError(error)) {
        const msg = error.data.message;
        if (error.data.message.startsWith("Username")) {
          setError("username", { type: "manual", message: msg });
        } else if (error.data.message.startsWith("Password")) {
          setError("password", { type: "manual", message: msg });
        }
      }
    }
  };

  return (
    <form
      className="flex w-96 flex-col gap-y-16 rounded bg-green-500 p-8"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2 className="text-5xl font-semibold">Sign In</h2>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-6 pr-6">
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              {...(errors.username ? { error: true } : {})}
              className="rounded-sm bg-white"
              id="username-input"
              label="Username"
              autoComplete="off"
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
          </ThemeProvider>
        </div>
        <span className="flex justify-center">
          <Button
            variant="contained"
            className="h-14 w-28 bg-amber-400 text-lg hover:bg-amber-500"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </span>
        <span className="flex items-center justify-center text-lg font-medium">
          Don't have an Account yet?{" "}
          <Button
            variant="text"
            className="py-0 pl-2 pr-0 text-lg text-amber-200"
          >
            Sign Up
          </Button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
