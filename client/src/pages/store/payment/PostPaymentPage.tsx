import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { useGetCartQuery, useGetLibraryQuery } from "../../../store";

const PostPaymentPage = () => {
  const navigate = useNavigate();

  useGetLibraryQuery();
  useGetCartQuery();

  return (
    <div className="relative mb-8 mt-10 flex h-[32rem] w-full items-center justify-center rounded-sm bg-gradient-to-br from-green-400 to-green-100 p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-green-50! mb-20 text-6xl font-semibold">
          Order was done successfully!
        </h1>
        <Button
          variant="contained"
          disableRipple
          className="inline-block w-max bg-green-500 p-4 text-lg shadow-none transition-colors hover:bg-green-600 active:bg-green-700"
          onClick={() => {
            navigate("/store");
          }}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default PostPaymentPage;
