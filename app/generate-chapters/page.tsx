import React from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import OmgBruh from "./generate-child-component";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return <OmgBruh />;
};

export default page;