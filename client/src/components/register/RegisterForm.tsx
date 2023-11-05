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
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  useRegisterUserMutation,
  useLazyGetProfileSecureQuery,
  useLazyGetCartQuery,
  useLazyGetLibraryQuery,
  useLazyGetWishlistQuery,
} from "../../store";
import { isAuthError } from "../../types/errors/authServiceErrors";

const registerFormValidationSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(200, { message: "Username exceeded 200 characters" })
      .refine((username) => !/\s/.test(username), {
        message: "Username cannot contain whitespace characters",
      }),
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
      main: "#422006",
    },
  },
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const [getProfileSecure] = useLazyGetProfileSecureQuery();
  const [getCart] = useLazyGetCartQuery();
  const [getLibrary] = useLazyGetLibraryQuery();
  const [getWishlist] = useLazyGetWishlistQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<RegisterFormValidationSchema>({
    resolver: zodResolver(registerFormValidationSchema),
    mode: "onBlur",
  });

  const [watchedUsername, watchedPassword, watchedConfirmPassword] = watch([
    "username",
    "password",
    "confirmPassword",
  ]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmitHandler: SubmitHandler<RegisterFormValidationSchema> = async (
    data,
  ) => {
    const { username, password } = data;
    const userCredentials = { username, password };
    try {
      await registerUser(userCredentials).unwrap();

      await getCart().unwrap();
      await getLibrary().unwrap();
      await getWishlist().unwrap();

      await getProfileSecure().unwrap();
      navigate("/store");
    } catch (error) {
      if (error && typeof error === "object" && isAuthError(error)) {
        const msg = error.data.error;
        if (error.data.error.startsWith("Username")) {
          setError("username", { type: "manual", message: msg });
        }
      }
    }
  };

  return (
    <form
      className="flex w-[32rem] flex-col gap-y-16 rounded bg-green-400 p-10 text-yellow-50 shadow-md"
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
                  background: "#4ade80",
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
                  background: "#4ade80",
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

            <FormControl variant="outlined">
              <InputLabel
                {...(errors.confirmPassword ? { error: true } : {})}
                htmlFor="confirm-password-input"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                {...(errors.confirmPassword ? { error: true } : {})}
                className="rounded-sm bg-white"
                id="confirm-password-input"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="off"
                placeholder="Enter Confirm Password"
                {...register("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                      }}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                style={{
                  background: "#4ade80",
                  margin: 0, // Cancel the margin
                  paddingTop: "3px", // Set the upper padding to 3px
                  paddingLeft: "14px", // Set the left padding to 14px
                  paddingRight: "14px", // Set the right padding to 14px
                }}
                error
              >
                {errors.confirmPassword ? errors.confirmPassword?.message : " "}
              </FormHelperText>
            </FormControl>
          </ThemeProvider>
        </div>
        <span className="flex justify-center">
          <Button
            variant="contained"
            className={`h-16 w-40 text-lg  shadow-none ${
              !watchedUsername || !watchedPassword || !watchedConfirmPassword
                ? "bg-gray-300 text-gray-400"
                : "bg-yellow-300 text-yellow-600 hover:bg-yellow-400 active:bg-yellow-500"
            }`}
            type="submit"
            disabled={
              isSubmitting ||
              !watchedUsername ||
              !watchedPassword ||
              !watchedConfirmPassword
            }
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </span>
        <span className="flex items-center justify-center text-lg font-medium">
          Have an account already?{" "}
          <Button
            variant="text"
            className="py-0 pl-2 pr-0 text-lg text-yellow-200"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
