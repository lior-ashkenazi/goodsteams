import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material";

import { useLazyGetProfileQuery, useLoginUserMutation } from "../../store";

import { isAuthError } from "../../types/errors/authServiceErrors";

const loginFormValidationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValidationSchema = z.infer<typeof loginFormValidationSchema>;

const textFieldTheme = createTheme({
  palette: {
    primary: {
      main: "#422006",
    },
  },
});

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValidationSchema>({
    resolver: zodResolver(loginFormValidationSchema),
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmitHandler: SubmitHandler<LoginFormValidationSchema> = async (
    data,
  ) => {
    const { username, password } = data;
    const userCredentials = { username, password };
    try {
      await loginUser(userCredentials).unwrap();
      await getProfile().unwrap();
      navigate("/store");
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
      className="flex w-[28rem] flex-col gap-y-16 rounded bg-green-500 p-10 shadow-md"
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

            <FormControl variant="outlined">
              <InputLabel
                {...(errors.password ? { error: true } : {})}
                htmlFor="password-input"
              >
                Password
              </InputLabel>
              <OutlinedInput
                {...(errors.password ? { error: true } : {})}
                className="rounded-sm bg-white"
                id="password-input"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                placeholder="Enter Password"
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                style={{
                  background: "#22c55e",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                }}
                error
              >
                {errors.password ? errors.password?.message : " "}
              </FormHelperText>
            </FormControl>
          </ThemeProvider>
        </div>
        <span className="flex justify-center">
          <Button
            variant="contained"
            className="h-16 w-40 bg-yellow-400 text-lg hover:bg-yellow-500"
            type="submit"
            disabled={isSubmitting}
            endIcon={<ExpandMore />}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </span>
        <span className="flex items-center justify-center text-lg font-medium">
          Don't have an account yet?{" "}
          <Button
            variant="text"
            className="py-0 pl-2 pr-0 text-lg text-yellow-200"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
