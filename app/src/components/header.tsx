import logo from "@/assets/refine_logo.png";
import { Input } from "./ui/input";
import { buttonVariants } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

const Logo = () => {
  return (
    <>
      <div className="logo w-16">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

const Header = () => {
  const mobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <div
        className={twMerge(
          "font-semibold",
          "container p-4 flex items-center gap-2",
          "bg-slate-100 text-[#161b22]",
          "dark:bg-[#161b22] dark:text-white"
        )}
      >
        {/* >768px logo */}

        {!mobile ? (
          <a href="">
            <Logo />
          </a>
        ) : (
          <>
            <HamburgerMenuIcon className="w-6 h-8 cursor-pointer" />
          </>
        )}

        <div className="px-2 flex-1 max-md:flex max-md:justify-center max-md:items-center">
          {/* >768px nav */}
          {!mobile && (
            <div className="flex gap-4 items-center">
              <Input placeholder="Search..." className="w-[16rem] h-10" />
              <nav>
                <a href="">All gists</a>
              </nav>
            </div>
          )}

          {/* <768px logo */}
          {mobile && (
            <a href="">
              <Logo />
            </a>
          )}
        </div>

        <div className="space-x-1">
          <a
            href=""
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "font-semibold",
            })}
          >
            Sign In
          </a>
          <a
            href=""
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "font-semibold",
            })}
          >
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
