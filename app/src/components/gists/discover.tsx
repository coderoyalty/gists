import supabase from "@/supabase-client";
import React from "react";

type User = {
  id: string;
  username: string;
};

type Gist = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user: User;
};

type DiscoverGists = Gist[];

const Discover = () => {
  const [_gists, setGists] = React.useState<DiscoverGists>([]);
  const [isLoading, _setLoading] = React.useState(false);

  const fetchGists = async () => {
    const { data, error } = await supabase
      .from("gists")
      .select(
        `
        id,
        title,
        created_at,
        updated_at,
        user:users (
        id,
        username
        )
        `
      )
      .filter("secret", "eq", true)
      .order("created_at", { ascending: false })
      .range(0, 10);

    if (error) {
      console.log(error.message);
    } else {
      setGists(data as unknown as DiscoverGists);
    }
  };

  if (isLoading) {
    // simulate loading-skeleton
  }

  React.useEffect(() => {
    fetchGists();
  }, []);

  return <>Discover Page</>;
};

export default Discover;
