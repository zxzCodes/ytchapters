// pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const githubSignature = req.headers["x-hub-signature-256"] as string;
  const payload = JSON.stringify(req.body);

  // Verify the signature if you’ve set a secret
  const secret = process.env.GITHUB_WEBHOOK_SECRET!;
  const crypto = await import("crypto");
  const generatedSignature = `sha256=${crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex")}`;

  if (generatedSignature !== githubSignature) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Handle the payload as per your needs
  console.log("Received webhook:", req.body);

  res.status(200).json({ message: "Webhook received" });
}
