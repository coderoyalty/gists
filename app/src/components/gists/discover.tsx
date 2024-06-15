import supabase from "@/supabase-client";
import React from "react";
import { CubeIcon } from "@radix-ui/react-icons";
import TypingAnimation from "../utils/typing-animation";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import MarkdownRenderer from "../utils/md-renderer";

type User = {
  id: string;
  username: string;
  dp_url: string;
};

type Gist = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user: User;
  content: string;
};

type DiscoverGists = Gist[];

const GistDetailIntro = () => {
  return (
    <>
      <div className="text-center px-3">
        <TypingAnimation
          as="p"
          duration={50}
          className="text-xl leading-9"
          text="Share and Collaborate on small pieces of information effortlessly."
        />
      </div>
    </>
  );
};

const GistHead = () => {
  return (
    <>
      <div className="pt-2 mb-3">
        <div className="px-3">
          <div className="mb-3">
            <h1 className="text-2xl align-middles">
              <CubeIcon className="inline mr-2 w-6 h-6" />
              Discover gists
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

const Discover = () => {
  const [gists, setGists] = React.useState<DiscoverGists>([]);
  const [isLoading, setLoading] = React.useState(true);

  const fetchGists = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gists")
      .select(
        `
        id,
        title,
        created_at,
        updated_at,
        content,
        user:users (
        id,
        username,
        dp_url
        )
        `
      )
      .filter("secret", "not.eq", true)
      .order("created_at", { ascending: false })
      .range(0, 10);

    if (error) {
      console.log(error.message);
    } else {
      setGists(data as unknown as DiscoverGists);
    }
    setLoading(false);
  };

  const GistSkeleton = () => (
    <div>
      <div className="flex space-x-2">
        <div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-[15px] w-[75px]" /> /
            <Skeleton className="h-[15px] w-[120px]" />
          </div>
          <div>
            <span>
              Created: <Skeleton className="h-[12px] inline-block w-[200px]" />
            </span>
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="h-[150px]" />
      </div>
    </div>
  );

  const skeletons = [];

  for (let i = 0; i < 3; i++) {
    skeletons.push(<GistSkeleton key={i} />);
  }

  React.useEffect(() => {
    fetchGists();
  }, []);

  return (
    <>
      <div className="space-y-2 my-2">
        <GistDetailIntro />

        {!isLoading && (
          <>
            <div className="mx-auto w-[80%] space-y-5 mt-2">
              <GistHead />

              {gists.map((gist) => (
                <div key={gist.id}>
                  <div className="flex space-x-2">
                    <div>
                      <img
                        src={
                          gist.user.dp_url ||
                          "https://avatar.iran.liara.run/public"
                        }
                        alt={`Profile picture of ${gist.user.username}`}
                        className="w-8 h-8 rounded-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div>
                        <Link
                          to={`/${gist.user.username}`}
                          className="px-1 text-blue-500 hover:underline hover:text-blue-700"
                        >
                          {gist.user.username}
                        </Link>{" "}
                        /
                        <Link
                          to={`/${gist.user.username}/${gist.id}`}
                          className="px-1 text-blue-500 hover:underline hover:text-blue-700 text-ellipsis"
                        >
                          {gist.title}
                        </Link>
                      </div>
                      <div>
                        <span>
                          Created:{" "}
                          {new Date(
                            gist.created_at || Date.now()
                          ).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2 p-2 border rounded-md border-neutral-600/60">
                    <MarkdownRenderer
                      content={gist.content.split("\n").slice(0, 10).join("\n")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {isLoading && (
          <div className="mx-auto w-[80%] space-y-3 mt-2">{skeletons}</div>
        )}
      </div>
    </>
  );
};

export default Discover;
