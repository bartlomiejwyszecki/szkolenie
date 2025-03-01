"use client";

import { APP_CONFIG } from "components/config/app";
import { RegisterForm } from "./RegisterForm";
import { AuthLayout } from "../AuthLayout";

export const Register = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Join {APP_CONFIG.name}
        </h1>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
};
