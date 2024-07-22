import { getServerSession } from "next-auth";
import Browse from "./_components/Browse";
import { authOptions } from "@/lib/auth";
import AuthErrorPage from "@/app/auth/error/page";
import { fetchRedis } from "@/lib/helpers/redis";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <AuthErrorPage />;
  }

  const matchesCount = (
    (await fetchRedis("smembers", `user:${session.user.id}:matches`)) as User[]
  ).length;
  return (
    <div>
      <Browse sessionID={session.user.id} initialMatchesCount={matchesCount} />
    </div>
  );
};

export default Page;
