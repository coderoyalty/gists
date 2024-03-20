import logo from "@/assets/refine_logo.png";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { ThemeSwitch } from "./theme-switch";
import React from "react";

const Logo = () => {
  return (
    <>
      <div className="logo w-16">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

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
            <a href={link.href} key={idx} className="p-2 hover:bg-slate-300/30">
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

const Header = () => {
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
          <a href="/">
            <Logo />
          </a>
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
            <a href="/">
              <Logo />
            </a>
          )}
        </div>

        <div className="flex space-x-1">
          <ThemeSwitch />
          <a
            href="/sign-in"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "font-semibold",
            })}
          >
            Sign In
          </a>
          <a
            href="sign-up"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "font-semibold",
            })}
          >
            Sign Up
          </a>
        </div>
      </div>
      <MobileNav show={showNav && mobile} />
    </div>
  );
};

export default Header;
