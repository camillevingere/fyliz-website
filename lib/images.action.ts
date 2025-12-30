"use server";

import { revalidatePath } from "next/cache";
import { PutObjectCommand, DeleteObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./s3";
import { env } from "./env";

export async function uploadImageAction({
  formData,
  key,
}: {
  formData: FormData;
  key: string;
}) {
  try {
    const file = formData.get("file") as File;
    
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB");
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ContentLength: buffer.length,
    });

    await s3Client.send(uploadCommand);
    
    console.log(`Successfully uploaded file: ${file.name} to S3 with key: ${key}`);
    
    return {
      key,
      url: key, // Return S3 key, presigned URLs will be generated when needed
      success: true,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error instanceof Error ? error.message : "Upload failed");
  }
}

export async function deleteImagesFromS3(keys: string[]) {
  try {
    if (keys.length === 0) {
      return {
        success: true,
        deletedKeys: [],
      };
    }

    console.log("Deleting S3 images:", keys);
    
    // Delete objects from S3
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Delete: {
        Objects: keys.map(key => ({ Key: key })),
        Quiet: false,
      },
    });

    const response = await s3Client.send(deleteCommand);
    
    console.log(`Successfully deleted ${keys.length} S3 images:`, keys);
    
    return {
      success: true,
      deletedKeys: keys,
      response,
    };
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error(error instanceof Error ? error.message : "Delete failed");
  }
}

export async function getImagePresignedUrl({ key }: { key: string }) {
  try {
    console.log(`Generating presigned URL for key: ${key}`);
    
    // Create a presigned URL for getting the object
    const getCommand = new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    });

    // Generate presigned URL that expires in 1 hour
    const presignedUrl = await getSignedUrl(s3Client, getCommand, {
      expiresIn: 3600, // 1 hour
    });
    
    console.log(`Successfully generated presigned URL for key: ${key}`);
    
    return {
      url: presignedUrl,
      key,
      success: true,
    };
  } catch (error) {
    console.error("Presigning error:", error);
    throw new Error(error instanceof Error ? error.message : "Presigning failed");
  }
}