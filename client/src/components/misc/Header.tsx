import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAuthUserQuery } from "../../store";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

interface HeaderProps {
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Header = ({ headerRef }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  const { isLoading } = useAuthUserQuery();
  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  // New state & refs for store and community
  const [openStoreButton, setOpenStoreButton] = useState<boolean>(false);
  const [openDiscussionsButton, setOpenDiscussionsButton] =
    useState<boolean>(false);
  const [openProfileButton, setOpenProfileButton] = useState<boolean>(false);

  const storeButtonRef = useRef<HTMLButtonElement>(null);
  const discussionsButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const onClickStoreButton = () => {
    setOpenStoreButton((prevOpen) => !prevOpen);
  };

  const onClickDiscussionsButton = () => {
    setOpenDiscussionsButton((prevOpen) => !prevOpen);
  };

  const onClickProfileButton = () => {
    setOpenProfileButton((prevOpen) => !prevOpen);
  };

  const onClickAwayStoreButton = (event: MouseEvent | TouchEvent) => {
    if (
      storeButtonRef.current &&
      storeButtonRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenStoreButton(false);
  };

  const onClickAwayDiscussionsButton = (event: MouseEvent | TouchEvent) => {
    if (
      discussionsButtonRef.current &&
      discussionsButtonRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenDiscussionsButton(false);
  };

  const onClickAwayProfileButton = (event: MouseEvent | TouchEvent) => {
    if (
      profileButtonRef.current &&
      profileButtonRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenProfileButton(false);
  };

  const renderStoreButton = () => {
    return (
      <>
        <Button
          ref={storeButtonRef}
          className={`text-lg font-medium text-amber-50 hover:text-white ${
            currentPage === "store" &&
            "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
          }`}
          onClick={onClickStoreButton}
          disableRipple
        >
          Store
        </Button>
        <Popper
          open={openStoreButton}
          anchorEl={storeButtonRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
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
                <ClickAwayListener onClickAway={onClickAwayStoreButton}>
                  <MenuList autoFocusItem={openStoreButton}>
                    <MenuItem
                      onClick={() => {
                        navigate("/store");
                        setOpenStoreButton(false);
                      }}
                      disableRipple
                    >
                      Featured
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                        setOpenStoreButton(false);
                      }}
                      disableRipple
                    >
                      Wishlist
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  const renderDiscussionsButton = () => {
    return (
      <>
        <Button
          ref={discussionsButtonRef}
          className={`text-lg font-medium text-amber-50 hover:text-white ${
            currentPage === "discussions" &&
            "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
          }`}
          onClick={onClickDiscussionsButton}
          disableRipple
        >
          Discussions
        </Button>
        <Popper
          open={openDiscussionsButton}
          anchorEl={discussionsButtonRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
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
                <ClickAwayListener onClickAway={onClickAwayDiscussionsButton}>
                  <MenuList autoFocusItem={openDiscussionsButton}>
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                        setOpenDiscussionsButton(false);
                      }}
                      disableRipple
                    >
                      Home
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                        setOpenDiscussionsButton(false);
                      }}
                      disableRipple
                    >
                      General Discussion
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  const renderLibraryButton = () => {
    return (
      <>
        {isAuthenticated && (
          <Button
            className={`text-lg font-medium text-amber-50 hover:text-white ${
              currentPage === "discussions" &&
              "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
            }`}
            onClick={() => navigate("/")}
            disableRipple
          >
            Library
          </Button>
        )}
      </>
    );
  };

  const renderProfileButton = () => {
    return (
      <>
        {isAuthenticated && (
          <>
            <Button
              ref={profileButtonRef}
              className={`text-lg font-medium text-amber-50 hover:text-white ${
                currentPage === "discussions" &&
                "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
              }`}
              onClick={onClickProfileButton}
              disableRipple
            >
              Username
            </Button>
            <Popper
              open={openProfileButton}
              anchorEl={profileButtonRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
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
                    <ClickAwayListener onClickAway={onClickAwayProfileButton}>
                      <MenuList autoFocusItem={openProfileButton}>
                        <MenuItem
                          onClick={() => {
                            navigate("/");
                            setOpenProfileButton(false);
                          }}
                          disableRipple
                        >
                          Activity
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate("/");
                            setOpenProfileButton(false);
                          }}
                          disableRipple
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate("/");
                            setOpenProfileButton(false);
                          }}
                          disableRipple
                        >
                          Friends
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
      </>
    );
  };

  return (
    <header
      ref={headerRef}
      className="flex w-full items-center justify-center bg-green-800 p-4"
    >
      <div className="flex w-[52rem] items-center justify-between rounded">
        <span className="flex justify-between gap-x-6">
          <Button onClick={() => navigate("/")} disableRipple>
            <h1 className="text-3xl font-medium tracking-tight text-amber-50">
              Good<span className="font-semibold">Steams</span>
            </h1>
          </Button>
          <ul className="flex items-center gap-x-2">
            <li>{renderStoreButton()}</li>
            <li>{renderDiscussionsButton()}</li>
            <li>{renderLibraryButton()}</li>
            <li>{renderProfileButton()}</li>
          </ul>
        </span>
        <Button
          className={`text-lg font-medium text-amber-50 hover:text-white ${
            (currentPage === "login" || currentPage === "register") &&
            "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
          }`}
          disableRipple
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
