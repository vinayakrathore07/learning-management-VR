import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];
  const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(decoded);
}

export default clerkMiddleware(async (auth, req) => {
  // 🔥 Explicitly request JWT created from template
  const token = await (await auth()).getToken({ template: "default" });

  let userRole: "student" | "teacher" = "student";

  if (token) {
    const payload = decodeJwtPayload(token);
    userRole = payload?.userType ?? "student";
  }

  // console.log("JWT ROLE:", userRole);

  if (isStudentRoute(req) && userRole !== "student") {
    return NextResponse.redirect(new URL("/teacher/courses", req.url));
  }

  if (isTeacherRoute(req) && userRole !== "teacher") {
    return NextResponse.redirect(new URL("/user/courses", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};


// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims } = await auth();

//   console.log("🔥 MIDDLEWARE SESSION:", sessionClaims);

//   const userRole =
//     (sessionClaims?.metadata as { userType?: "student" | "teacher" })
//       ?.userType || "student";

//   console.log("🔥 USER ROLE:", userRole)
// }
// )
