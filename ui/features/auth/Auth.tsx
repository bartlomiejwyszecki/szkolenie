"use client";

import { Link } from "components/components/ui/Link/Link";
import { AuthLayout } from "./AuthLayout";
import { Login } from "./login/Login";

export const Auth = () => {
  return (
    <AuthLayout>
      <Login />
      <span>
        Don&apos;t have an account yet? Please{" "}
        <Link href="/register">click to Sign up</Link>.
      </span>
    </AuthLayout>
  );
};
