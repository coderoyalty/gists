import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { ThemeSwitch } from "./theme-switch";
import React from "react";
import Logo from "./logo";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/app.context";
import supabase from "@/supabase-client";
import { useToast } from "./ui/use-toast";
import { useAuthContext } from "@/contexts/auth.context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { isAuthenticated } = useAppContext();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width: 767px)");

  const [showNav, setShowNav] = React.useState(false);

  const onSignOut = async () => {
    try {
      await supabase.auth.signOut();

      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (err) {
      toast({
        description: "Couldn't sign the current session out",
      });
    }
  };

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
                <Link to="/discover">All gists</Link>
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
          {!isAuthenticated ? (
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
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <img
                      src={
                        user?.dp_url || "https://avatar.iran.liara.run/public"
                      }
                      className="w-9 h-9 rounded-full object-contain"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>@{user?.username}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(_) => {
                      onSignOut();
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
      <MobileNav show={showNav && mobile} />
    </div>
  );
};

export default Header;
