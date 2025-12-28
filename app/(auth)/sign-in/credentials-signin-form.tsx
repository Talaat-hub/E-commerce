"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { signInDefaultValues } from "@/lib/constants";
import { SignInFormState } from "@/types/signInFormState";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const CredentialsSignInForm = () => {
  const [state, formAction] = useActionState<SignInFormState, FormData>(
    signInWithCredentials,
    {
      success: false,
      message: "",
    }
  );

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form action={formAction}>
      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <SignInButton />
        {state && !state.success && (
          <div className="text-center text-destructive ">{state.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            target="_self"
            className="link hover:text-blue-400 duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
