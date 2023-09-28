type AuthError = {
  status: number;
  data: {
    error: string;
    stack?: string;
  };
};

export function isAuthError(obj: object): obj is AuthError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "status" in obj &&
    typeof obj.status === "number" &&
    "data" in obj &&
    typeof obj.data === "object" &&
    obj.data !== null &&
    "error" in obj.data &&
    typeof obj.data.error === "string"
  );
}
