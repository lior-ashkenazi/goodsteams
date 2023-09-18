import { useGetCartQuery, useGetLibraryQuery } from "../../../store";

const PostPaymentPage = () => {
  useGetLibraryQuery();
  useGetCartQuery();

  return <div>Order was done successfully!</div>;
};

export default PostPaymentPage;
