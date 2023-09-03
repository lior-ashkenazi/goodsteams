import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ClickAwayListener } from "@mui/material";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";

interface HeaderProps {
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Header = ({ headerRef }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const username: string | null = useSelector(
    (state: RootState) => state.profile.username,
  );

  const avatarUrl: string | null = useSelector(
    (state: RootState) => state.profile.avatarUrl,
  );

  // New state & refs for store and community
  const [openStoreMenu, setOpenStoreMenu] = useState<boolean>(false);
  const [openDiscussionsMenu, setOpenDiscussionsMenu] =
    useState<boolean>(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);

  const [openLoginMenu, setOpenLoginMenu] = useState<boolean>(false);

  const storeButtonRef = useRef<HTMLButtonElement>(null);
  const discussionsButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const renderStoreButton = () => {
    return (
      <>
        <Button
          ref={storeButtonRef}
          className={`text-lg font-medium text-amber-50 hover:text-white ${
            currentPage === "store" &&
            "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
          }`}
          onClick={() => navigate("/store")}
          onMouseEnter={() => setOpenStoreMenu(true)}
          onMouseLeave={() => setOpenStoreMenu(false)}
          disableRipple
        >
          Store
        </Button>
        <Popper
          open={openStoreMenu}
          anchorEl={storeButtonRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          onMouseEnter={() => setOpenStoreMenu(true)}
          onMouseLeave={() => setOpenStoreMenu(false)}
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
                <MenuList autoFocusItem={openStoreMenu}>
                  <MenuItem
                    onClick={() => {
                      navigate("/store");
                      setOpenStoreMenu(false);
                    }}
                    disableRipple
                  >
                    Featured
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      setOpenStoreMenu(false);
                    }}
                    disableRipple
                  >
                    Wishlist
                  </MenuItem>
                </MenuList>
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
          onClick={() => navigate("/")}
          onMouseEnter={() => setOpenDiscussionsMenu(true)}
          onMouseLeave={() => setOpenDiscussionsMenu(false)}
          disableRipple
        >
          Discussions
        </Button>
        <Popper
          open={openDiscussionsMenu}
          anchorEl={discussionsButtonRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          onMouseEnter={() => setOpenDiscussionsMenu(true)}
          onMouseLeave={() => setOpenDiscussionsMenu(false)}
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
                <MenuList autoFocusItem={openDiscussionsMenu}>
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      setOpenDiscussionsMenu(false);
                    }}
                    disableRipple
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      setOpenDiscussionsMenu(false);
                    }}
                    disableRipple
                  >
                    General Discussion
                  </MenuItem>
                </MenuList>
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
        {isAuthenticated && username && (
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
        {isAuthenticated && username && (
          <>
            <Button
              ref={profileButtonRef}
              className={`text-lg font-medium text-amber-50 hover:text-white ${
                currentPage === "discussions" &&
                "truncate font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
              }`}
              onMouseEnter={() => setOpenProfileMenu(true)}
              onMouseLeave={() => setOpenProfileMenu(false)}
              disableRipple
            >
              {username}
            </Button>
            <Popper
              open={openProfileMenu}
              anchorEl={profileButtonRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              onMouseEnter={() => setOpenProfileMenu(true)}
              onMouseLeave={() => setOpenProfileMenu(false)}
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
                    <MenuList autoFocusItem={openProfileMenu}>
                      <MenuItem
                        onClick={() => {
                          navigate("/");
                          setOpenProfileMenu(false);
                        }}
                        disableRipple
                      >
                        Activity
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/");
                          setOpenProfileMenu(false);
                        }}
                        disableRipple
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/");
                          setOpenProfileMenu(false);
                        }}
                        disableRipple
                      >
                        Friends
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
      </>
    );
  };

  const renderCartIcon = () => {
    return (
      isAuthenticated &&
      username && (
        <IconButton aria-label={"cart"}>
          <Badge
            badgeContent={4}
            color="error" // Using this to ensure default colors are overridden
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#22c55e",
                color: "#fffbeb",
              },
            }}
          >
            <ShoppingCartIcon style={{ color: "#fffbeb" }} />
          </Badge>
        </IconButton>
      )
    );
  };

  const renderLoginButton = () => {
    return isAuthenticated && username ? (
      <>
        <Button
          ref={loginButtonRef}
          className={`font-medium text-amber-50 hover:text-white ${
            (currentPage === "login" || currentPage === "register") &&
            "font-semibold text-green-950 underline decoration-2 underline-offset-4 hover:text-green-950"
          }`}
          disableRipple
          onClick={() => setOpenLoginMenu(true)}
          endIcon={<ExpandMoreIcon />}
        >
          {username}
        </Button>
        <Popper
          open={openLoginMenu}
          anchorEl={loginButtonRef.current}
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
                <ClickAwayListener
                  onClickAway={(event: MouseEvent | TouchEvent) => {
                    if (
                      storeButtonRef.current &&
                      storeButtonRef.current.contains(
                        event.target as HTMLElement,
                      )
                    ) {
                      return;
                    }
                    setOpenLoginMenu(false);
                  }}
                >
                  <MenuList autoFocusItem={openLoginMenu}>
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                        setOpenLoginMenu(false);
                      }}
                      disableRipple
                    >
                      View profile
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                        setOpenLoginMenu(false);
                      }}
                      disableRipple
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    ) : (
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
    );
  };

  const renderAvatar = () => {
    return (
      isAuthenticated &&
      avatarUrl && (
        <button onClick={() => navigate("/")}>
          <Avatar alt="Profile Avatar" src={avatarUrl} />
        </button>
      )
    );
  };

  return (
    <header
      ref={headerRef}
      className="flex w-full items-center justify-center bg-green-800 p-4"
    >
      <div className="flex w-[64rem] items-center justify-between rounded">
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
        <span className="flex gap-x-2">
          {renderCartIcon()}
          {renderLoginButton()}
          {renderAvatar()}
        </span>
      </div>
    </header>
  );
};

export default Header;
