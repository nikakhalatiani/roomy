import { useEffect, Dispatch, SetStateAction } from "react";
import { User } from "@/types/user";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const useDelayedIncreasedScore = ({ user, setUser }: Props) => {
  const { score, } = user;
  useEffect(() => {
    let userUpdateTimeOut: string | number | NodeJS.Timeout | undefined;
    userUpdateTimeOut = setTimeout(() => {
      setUser((state) => ({ ...state, previousScore: score }));
    }, 500);

    return () => {
      clearTimeout(userUpdateTimeOut);
    };
  }, [user]);
};
export default useDelayedIncreasedScore;