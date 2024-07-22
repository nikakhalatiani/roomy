"use server";
import { authOptions } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getServerSession } from "next-auth";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const maxFileSize = 1024 * 1024 * 5; // 5MB

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { failure: "You have to be logged in" };
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "File too large" };
  }
  const PutObjctCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: session.user.id,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
  });

  const signedURL = await getSignedUrl(s3, PutObjctCommand, {
    expiresIn: 60,
  });
  return { success: { url: signedURL } };
}
