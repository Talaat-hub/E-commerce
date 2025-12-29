"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { SignUpFormState } from "@/types/auth";

const SignUpForm = () => {
  const [data, formAction] = useActionState<SignUpFormState, FormData>(
    signUpUser,
    {
      success: false,
      message: "",
    }
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={formAction}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirnPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            target="_self"
            className="link hover:text-blue-400 duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" variant="default">
      {pending ? "Submitting..." : "Sign Up"}
    </Button>
  );
};

export default SignUpForm;
