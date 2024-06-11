import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen gap-3 justify-center items-center">
        <h1 className="text-7xl text-center">Oops</h1>
        <h2 className="text-xl text-red-500">
          <span className="font-bold text-xl">404</span> - PAGE NOT FOUND
        </h2>

        <Link
          to="/"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
