import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Rota /admin requer role ADMIN
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Rotas protegidas requerem conta ativa (exceto admin)
    if (
      (pathname.startsWith("/dashboard") || pathname.startsWith("/manuais") || pathname.startsWith("/oleo-suspensao") || pathname.startsWith("/calculadora") || pathname.startsWith("/diagnostico")) &&
      token?.role !== "ADMIN" &&
      !token?.active
    ) {
      return NextResponse.redirect(new URL("/conta-inativa", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/manuais/:path*", "/oleo-suspensao/:path*", "/calculadora/:path*", "/diagnostico/:path*", "/admin/:path*"],
};
