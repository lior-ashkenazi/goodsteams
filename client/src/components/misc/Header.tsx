import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useLogoutUserMutation } from "../../store";
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
import { Cart } from "../../types/models/cart/Cart";

interface HeaderProps {
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Header = ({ headerRef }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  const [logoutUser] = useLogoutUserMutation();

  const isAuthenticated: boolean | null = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const username: string | null = useSelector(
    (state: RootState) => state.profile.username,
  );
  const avatarUrl: string | null = useSelector(
    (state: RootState) => state.profile.avatarUrl,
  );
  // The reducer is called cart and inside it we have a property called cart
  const cart: Cart | null = useSelector((state: RootState) => state.cart.cart);

  // New state & refs for store and community
  const [openStoreMenu, setOpenStoreMenu] = useState<boolean>(false);
  const [openCommunityMenu, setOpenCommunityMenu] = useState<boolean>(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);

  const [openLoginMenu, setOpenLoginMenu] = useState<boolean>(false);

  const storeButtonRef = useRef<HTMLButtonElement>(null);
  const communityButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    await logoutUser().unwrap();
    navigate("/");
  };

  const renderStoreButton = () => {
    return (
      <>
        <Button
          ref={storeButtonRef}
          className={`text-lg font-medium ${
            currentPage !== "store"
              ? "text-yellow-50 hover:text-white"
              : "text-green-950 hover:text-green-950"
          } ${
            currentPage === "store" &&
            "font-semibold  underline decoration-2 underline-offset-4"
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
                  <MenuItem disableRipple>News</MenuItem>
                  <MenuItem disableRipple>About</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  const renderCommunityButton = () => {
    return (
      <>
        <Button
          ref={communityButtonRef}
          className={`text-lg font-medium ${
            currentPage !== "community"
              ? "text-yellow-50 hover:text-white"
              : "text-green-950 hover:text-green-950"
          } ${
            currentPage === "community" &&
            "font-semibold  underline decoration-2 underline-offset-4"
          }`}
          onClick={() => navigate("/")}
          onMouseEnter={() => setOpenCommunityMenu(true)}
          onMouseLeave={() => setOpenCommunityMenu(false)}
          disableRipple
        >
          Community
        </Button>
        <Popper
          open={openCommunityMenu}
          anchorEl={communityButtonRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          onMouseEnter={() => setOpenCommunityMenu(true)}
          onMouseLeave={() => setOpenCommunityMenu(false)}
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
                      navigate("/");
                      setOpenCommunityMenu(false);
                    }}
                    disableRipple
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      setOpenCommunityMenu(false);
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
            className={`text-lg font-medium ${
              currentPage !== "library"
                ? "text-yellow-50 hover:text-white"
                : "text-green-950 hover:text-green-950"
            } ${
              currentPage === "library" &&
              "font-semibold  underline decoration-2 underline-offset-4"
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
              className={`text-lg font-medium ${
                currentPage !== "profile"
                  ? "text-yellow-50 hover:text-white"
                  : "text-green-950 hover:text-green-950"
              } ${
                currentPage === "profile" &&
                "font-semibold  underline decoration-2 underline-offset-4"
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
        <IconButton aria-label={"cart"} onClick={() => navigate("/store/cart")}>
          {cart && cart.cartItems && cart.cartItems.length > 0 ? (
            <Badge
              badgeContent={cart.cartItems.length}
              color="error" // Using this to ensure default colors are overridden
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#22c55e",
                  color: "#fefce8",
                },
              }}
            >
              <ShoppingCartIcon style={{ color: "#fefce8" }} />
            </Badge>
          ) : (
            <ShoppingCartIcon style={{ color: "#fefce8" }} />
          )}
        </IconButton>
      )
    );
  };

  const renderLoginButton = () => {
    return isAuthenticated && username ? (
      <>
        <Button
          ref={loginButtonRef}
          className="font-medium font-semibold text-yellow-50 underline decoration-2 underline-offset-4 hover:text-white"
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
                  <MenuList>
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
                        setOpenLoginMenu(false);
                        handleLogout();
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
        className={`font-medium text-amber-50 hover:text-white ${
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
            <h1 className="text-3xl font-medium tracking-tight text-yellow-50">
              Good<span className="font-semibold">Steams</span>
            </h1>
          </Button>
          <ul className="flex items-center gap-x-2">
            <li>{renderStoreButton()}</li>
            <li>{renderCommunityButton()}</li>
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
