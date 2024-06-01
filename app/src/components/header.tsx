import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { ThemeSwitch } from "./theme-switch";
import React from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/app.context";

interface MobileNavProps {
  show: boolean;
}

const navLinks = [{ name: "All Gists", href: "/discover" }];

const MobileNav: React.FC<MobileNavProps> = ({ show }) => {
  if (!show) {
    return <></>;
  }

  return (
    <>
      <div className="px-[1em] space-y-2 py-2">
        <Input type="text" placeholder="Search..." className="h-8 outline-1" />
        <nav className="flex flex-col gap-1 divide-y-[1px]">
          {navLinks.map((link, idx) => (
            <Link
              to={link.href}
              key={idx}
              className="p-2 hover:bg-slate-300/30"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

const Header = () => {
  const { signedIn } = useAppContext();
  const mobile = useMediaQuery("(max-width: 767px)");

  const [showNav, setShowNav] = React.useState(false);

  return (
    <div
      className={twMerge(
        "font-semibold max-md:font-medium",
        "bg-slate-50 text-[#161b22]",
        "dark:bg-[#161b22] dark:text-white"
      )}
    >
      <div className="container p-4 flex items-center gap-2">
        {/* >768px logo */}

        {!mobile ? (
          <Link to="/">
            <Logo />
          </Link>
        ) : (
          <>
            <HamburgerMenuIcon
              className="w-6 h-8 cursor-pointer"
              onClick={() => setShowNav(!showNav)}
            />
          </>
        )}

        <div className="px-2 flex-1 max-md:flex max-md:justify-center max-md:items-center">
          {/* >768px nav */}
          {!mobile && (
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                placeholder="Search..."
                className="w-[16rem] h-10 outline-none"
              />
              <nav>
                <a href="">All gists</a>
              </nav>
            </div>
          )}

          {/* <768px logo */}
          {mobile && (
            <Link to="/">
              <Logo />
            </Link>
          )}
        </div>

        <div className="flex space-x-1">
          <ThemeSwitch />
          {!signedIn && (
            <>
              <Link
                to="/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "font-semibold",
                })}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "font-semibold",
                })}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <MobileNav show={showNav && mobile} />
    </div>
  );
};

export default Header;
