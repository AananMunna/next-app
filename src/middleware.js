import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    // শুধু /trips/[কিছু] protect করবে
    "/trips/:path+",
    "/community/:path+"
  ],
};
