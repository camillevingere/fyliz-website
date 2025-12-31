import { getImagePresignedUrl } from "@/lib/images.action";

// Utility function to extract S3 key from presigned URL
export const extractS3KeyFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((part) => part !== "");

    // Remove the bucket name from the path to get the actual key
    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
    const bucketIndex = pathParts.findIndex((part) => part === bucketName);

    if (bucketIndex !== -1 && bucketIndex + 1 < pathParts.length) {
      return pathParts.slice(bucketIndex + 1).join("/");
    } else {
      // Fallback: remove leading slash and bucket name manually
      return urlObj.pathname.substring(1).replace(`${bucketName}/`, "");
    }
  } catch (error) {
    console.error("Error extracting S3 key from URL:", url, error);
    return null;
  }
};

// Utility function to check if URL is a presigned S3 URL
export const isPresignedS3Url = (url: string): boolean => {
  return url.includes("X-Amz-Signature=");
};

// Utility function to check if URL is an S3 key (not a full URL)
export const isS3Key = (url: string): boolean => {
  return !url.startsWith("http") && !url.startsWith("data:");
};

// Utility function to extract all image URLs from markdown
export const extractImageUrlsFromMarkdown = (markdown: string): string[] => {
  const urls: string[] = [];

  // Handle markdown image syntax: ![alt](url) or ![](url)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+?)(?:\s+"[^"]*")?\)/g;
  const markdownMatches = [...markdown.matchAll(markdownImageRegex)];

  for (const match of markdownMatches) {
    const url = match[2];
    urls.push(url);
  }

  // Handle HTML img tags: <img src="url" ...>
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  const htmlMatches = [...markdown.matchAll(htmlImgRegex)];

  for (const match of htmlMatches) {
    const url = match[1];
    urls.push(url);
  }

  return urls;
};

// Utility function to extract S3 keys from markdown
export const extractS3KeysFromMarkdown = (markdown: string): string[] => {
  const urls = extractImageUrlsFromMarkdown(markdown);
  return urls
    .map((url) => {
      if (isS3Key(url)) {
        return url;
      } else if (isPresignedS3Url(url)) {
        return extractS3KeyFromUrl(url);
      }
      return null;
    })
    .filter((key): key is string => key !== null);
};

// Utility function to process URLs in markdown content (async version)
export const processUrlsInMarkdownAsync = async (
  markdown: string,
  processUrl: (url: string) => Promise<string>
): Promise<string> => {
  let processedMarkdown = markdown;

  // Handle markdown image syntax: ![alt](url) or ![](url)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+?)(?:\s+"[^"]*")?\)/g;
  const markdownMatches = [...markdown.matchAll(markdownImageRegex)];

  for (const match of markdownMatches) {
    const [, , url] = match;
    const processedUrl = await processUrl(url);
    processedMarkdown = processedMarkdown.replace(url, processedUrl);
  }

  // Handle HTML img tags: <img src="url" ...>
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  const htmlMatches = [...processedMarkdown.matchAll(htmlImgRegex)];

  for (const match of htmlMatches) {
    const [, url] = match;
    const processedUrl = await processUrl(url);
    processedMarkdown = processedMarkdown.replace(url, processedUrl);
  }

  return processedMarkdown;
};

// Utility function to process URLs in markdown content (sync version)
export const processUrlsInMarkdownSync = (
  markdown: string,
  processUrl: (url: string) => string
): string => {
  let processedMarkdown = markdown;

  // Handle markdown image syntax: ![alt](url) or ![](url)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+?)(?:\s+"[^"]*")?\)/g;
  const markdownMatches = [...markdown.matchAll(markdownImageRegex)];

  for (const match of markdownMatches) {
    const [, , url] = match;
    const processedUrl = processUrl(url);
    processedMarkdown = processedMarkdown.replace(url, processedUrl);
  }

  // Handle HTML img tags: <img src="url" ...>
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  const htmlMatches = [...processedMarkdown.matchAll(htmlImgRegex)];

  for (const match of htmlMatches) {
    const [, url] = match;
    const processedUrl = processUrl(url);
    processedMarkdown = processedMarkdown.replace(url, processedUrl);
  }

  return processedMarkdown;
};

// Preprocess markdown to convert S3 keys to presigned URLs
export const preprocessMarkdown = async (markdown: string): Promise<string> => {
  return processUrlsInMarkdownAsync(markdown, async (url) => {
    if (isS3Key(url)) {
      try {
        const { url: presignedUrl } = await getImagePresignedUrl({ key: url });
        return presignedUrl;
      } catch (error) {
        console.error("Error presigning URL for key:", url, error);
        return url; // Keep original if presigning fails
      }
    }
    return url;
  });
};

// Postprocess markdown to convert presigned URLs back to S3 keys for storage
export const postprocessMarkdown = (markdown: string): string => {
  return processUrlsInMarkdownSync(markdown, (url) => {
    if (isPresignedS3Url(url)) {
      const key = extractS3KeyFromUrl(url);
      return key || url;
    }
    return url;
  });
};

// Utility function to detect new S3 keys in the markdown
export const extractNewS3Keys = (
  newMarkdown: string,
  processedMarkdown: string
): string[] => {
  const newKeys: string[] = [];

  // Extract S3 keys from new markdown
  // Handles both ![alt](url) and ![](url) formats
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+?)(?:\s+"[^"]*")?\)/g;
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;

  // Check markdown syntax
  const markdownMatches = [...newMarkdown.matchAll(markdownImageRegex)];
  for (const match of markdownMatches) {
    const url = match[2];
    if (isS3Key(url) && !processedMarkdown.includes(url)) {
      newKeys.push(url);
    }
  }

  // Check HTML img tags
  const htmlMatches = [...newMarkdown.matchAll(htmlImgRegex)];
  for (const match of htmlMatches) {
    const url = match[1];
    if (isS3Key(url) && !processedMarkdown.includes(url)) {
      newKeys.push(url);
    }
  }

  return newKeys;
};

// Utility function to detect removed S3 keys from markdown
export const extractRemovedS3Keys = (
  oldMarkdown: string,
  newMarkdown: string
): string[] => {
  const oldS3Keys = extractS3KeysFromMarkdown(oldMarkdown);
  const newS3Keys = extractS3KeysFromMarkdown(newMarkdown);

  // Find keys that were in old markdown but not in new markdown
  return oldS3Keys.filter((key) => !newS3Keys.includes(key));
};
