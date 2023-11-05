import { Button } from "@mui/material";

interface BookDiscussionsNewDiscussionButtonInterface {
  openNewDiscussion: () => void;
}

const BookDiscussionsNewDiscussionButton = ({
  openNewDiscussion,
}: BookDiscussionsNewDiscussionButtonInterface) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-l from-green-800 to-green-700 p-8">
      <Button
        variant="contained"
        className="bg-gradient-to-t from-green-600 to-green-500 text-base normal-case text-green-50 transition-colors hover:from-green-500 hover:to-green-400"
        onClick={openNewDiscussion}
        disableElevation
        disableRipple
      >
        Start a New Discussion
      </Button>
    </div>
  );
};

export default BookDiscussionsNewDiscussionButton;
