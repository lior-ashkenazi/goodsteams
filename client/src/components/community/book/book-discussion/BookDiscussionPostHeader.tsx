import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Popper, Grow, Paper, MenuList, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Comment } from "../../../../types/models/community/Comment";
import { Profile } from "../../../../types/models/profile/Profile";
import { formatDate } from "../../../../utils/dateUtils";

interface BookDiscussionPostHeaderProps {
  comment: Comment;
  profile: Profile;
}

const BookDiscussionPostHeader = ({
  comment,
  profile,
}: BookDiscussionPostHeaderProps) => {
  const navigate = useNavigate();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  const profileButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="flex items-center gap-x-5">
      <img
        src={profile.avatarUrl}
        className="w-10"
        aria-aria-label="original-post-user-avatar"
      />
      <Button
        ref={profileButtonRef}
        variant="text"
        className="justify-start truncate p-0 text-base normal-case text-current hover:bg-transparent"
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        disableRipple
        endIcon={<ArrowDropDownIcon />}
      >
        {profile.username}
      </Button>
      <Popper
        open={isProfileMenuOpen}
        anchorEl={profileButtonRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        onMouseEnter={() => setIsProfileMenuOpen(true)}
        onMouseLeave={() => setIsProfileMenuOpen(false)}
        className="z-10"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/store");
                    setIsProfileMenuOpen(false);
                  }}
                  disableRipple
                >
                  View Profile
                </MenuItem>
                <MenuItem disableRipple>View Posts</MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
      <span className="text-green-200 text-opacity-90">
        {formatDate(comment.createdAt, "discussions")}
      </span>
    </header>
  );
};

export default BookDiscussionPostHeader;
