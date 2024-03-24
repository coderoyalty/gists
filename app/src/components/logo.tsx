import logo from "@/assets/gist_logo.svg";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  className?: string;
  alt?: string;
  src?: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <>
      <div className="logo w-16">
        <img
          src={props.src ?? logo}
          className={twMerge(props.className ?? "scale-[2]", "w-full h-full")}
          alt={props.alt ?? "logo"}
        />
      </div>
    </>
  );
};

export default Logo;
