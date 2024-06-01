import supabase from "../supabase-client";

interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
}

type Criteria = {
  [key: string]: string | number | boolean;
};

const findUser = async (criteria: Criteria = {}) => {
  const query = supabase.from("users").select();

  for (const [key, value] of Object.entries(criteria)) {
    query.eq(key, value);
  }

  const { data, error } = await query.single();

  if (error) {
    return null;
  }
  return data;
};

const createUser = async (user: IUser) => {
  let existing = await findUser({ email: user.email });
  if (existing) {
    console.log("User already exists");
    return false;
  } else {
    existing = await findUser({ username: user.username });

    if (existing) return false;
  }

  let authRes = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (authRes.error) {
    return false;
  }

  const { error } = await supabase.from("users").insert([
    {
      auth_user_id: authRes.data.user?.id,
      name: user.name,
      username: user.username,
    },
  ]);

  if (error) {
    console.error(error);
    return false;
  } else {
    return true;
  }
};

export { createUser };
