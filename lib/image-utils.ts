import { getImagePresignedUrl } from "./images.action";
import { isS3Key } from "./mdx-utils";

/**
 * Get a signed URL for an image if it's an S3 key, otherwise return the URL as-is
 * @param imageUrl - The image URL or S3 key
 * @returns Promise<string | null> - The signed URL or null if no image
 */
export async function getSignedImageUrl(
  imageUrl: string | null
): Promise<string | null> {
  if (!imageUrl) return null;

  // If it's already a full URL (http/https), return as-is
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // If it's an S3 key, get presigned URL
  if (isS3Key(imageUrl)) {
    try {
      const { url } = await getImagePresignedUrl({ key: imageUrl });
      return url;
    } catch (error) {
      console.error("Error getting presigned URL for image:", imageUrl, error);
      return null;
    }
  }

  // For any other format, return as-is
  return imageUrl;
}