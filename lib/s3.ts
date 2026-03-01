import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "eu-west-1";
const bucket = process.env.AWS_S3_BUCKET;
const bucketUrl = process.env.AWS_S3_PUBLIC_URL; // optional: e.g. https://bucket.s3.region.amazonaws.com or CloudFront URL

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set.");
  }
  if (!client) {
    client = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return client;
}

/**
 * Generate a presigned PUT URL so the client can upload a file directly to S3.
 * Key will be: artwork/{timestamp}-{sanitizedFilename}
 */
export async function getPresignedPutUrl(
  fileName: string,
  contentType: string,
  expiresIn = 900
): Promise<{ uploadUrl: string; key: string }> {
  if (!bucket) throw new Error("AWS_S3_BUCKET is not set.");
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `artwork/${Date.now()}-${sanitized}`;
  const s3 = getClient();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType || "application/octet-stream",
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn });
  return { uploadUrl, key };
}

/**
 * Build the public URL for an object. Use AWS_S3_PUBLIC_URL if set (e.g. CloudFront),
 * otherwise default to virtual-hosted-style: https://bucket.s3.region.amazonaws.com/key
 */
export function getPublicUrl(key: string): string {
  if (bucketUrl) {
    const base = bucketUrl.replace(/\/$/, "");
    return `${base}/${key}`;
  }
  if (!bucket) throw new Error("AWS_S3_BUCKET is not set.");
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_S3_BUCKET
  );
}
