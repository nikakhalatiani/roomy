import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AuthErrorPage from "@/app/auth/error/page";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <AuthErrorPage />;
  }
  return <div>{children}</div>;
};

export default Layout;
