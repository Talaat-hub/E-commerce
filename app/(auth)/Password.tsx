"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  defaultValue?: string;
  autoComplete?: string;
}

const PasswordInput = ({
  id,
  name,
  defaultValue,
  autoComplete,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default PasswordInput;
