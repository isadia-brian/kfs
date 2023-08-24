"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const session = true;

  if (session === true) {
    return <>{router.push("/signup")}</>;
  } else {
    return <>{router.push("/login")}</>;
  }
}
