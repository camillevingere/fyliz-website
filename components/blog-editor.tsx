"use client";
import { InitializedMDXEditor } from "@/components/InitializedMDXEditor";
import type { BadgeProps } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import { deleteImagesFromS3, getImagePresignedUrl, uploadImageAction } from "@/lib/images.action";
import {
  extractNewS3Keys,
  extractRemovedS3Keys,
  postprocessMarkdown,
  preprocessMarkdown,
} from "@/lib/mdx-utils";
import { supabase } from "@/lib/supabase";
import { Upload, X } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export type BlogEditorProps = {
  articleId: string;
  markdown: string;
  title: string;
  description: string;
  status: string;
  publishedAt?: string | null;
  author: string;
  tags: string[];
  keywords: string[];
  currentImage?: string | null;
  type?: string;
};

type SyncState = "sync" | "not-sync" | "syncing";

const getBadgeVariant = (syncState: SyncState): BadgeProps["variant"] => {
  if (syncState === "not-sync") {
    return "destructive";
  }

  if (syncState === "syncing") {
    return "default";
  }

  return "secondary";
};

export const BlogEditor = ({
  articleId,
  markdown,
  title: initialTitle,
  description: initialDescription,
  status: initialStatus,
  publishedAt,
  author: initialAuthor,
  tags: initialTags,
  keywords: initialKeywords,
  currentImage,
  type = "articles"
}: BlogEditorProps) => {
  const [syncState, setSyncState] = useState<SyncState>("sync");
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [author, setAuthor] = useState(initialAuthor);
  const [status, setStatus] = useState(initialStatus);
  const [tags, setTags] = useState(initialTags.join(", "));
  const [keywords, setKeywords] = useState(initialKeywords.join(", "));
  const [currentMarkdown, setCurrentMarkdown] = useState(markdown);
  const [processedMarkdown, setProcessedMarkdown] = useState<string>("");
  const [previousMarkdown, setPreviousMarkdown] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(currentImage || null);
  const [presignedImageUrl, setPresignedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const updateArticle = async (updates: any) => {
    setSyncState("syncing");

    try {
      const { error } = await supabase
        .from(type)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId);

      if (error) {
        toast.error("Erreur lors de la sauvegarde");
        setSyncState("not-sync");
        console.error("Update error:", error);
        return;
      }

      setSyncState("sync");
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde");
      setSyncState("not-sync");
    }
  };

  // Preprocess markdown on mount and when markdown changes
  useEffect(() => {
    const processMarkdown = async () => {
      const processed = await preprocessMarkdown(currentMarkdown);
      setProcessedMarkdown(processed);
      setPreviousMarkdown(currentMarkdown);
    };

    processMarkdown();
  }, [currentMarkdown]);

  // Generate presigned URL for current image
  useEffect(() => {
    const generatePresignedUrl = async () => {
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          const { url } = await getImagePresignedUrl({ key: imageUrl });
          setPresignedImageUrl(url);
        } catch (error) {
          console.error('Error generating presigned URL:', error);
          setPresignedImageUrl(null);
        }
      } else if (imageUrl && imageUrl.startsWith('http')) {
        setPresignedImageUrl(imageUrl);
      } else {
        setPresignedImageUrl(null);
      }
    };

    generatePresignedUrl();
  }, [imageUrl]);

  const onContentChange = useDebounceFn(async (value: string) => {
    setSyncState("syncing");

    try {
      // Check if there are new S3 keys that need to be presigned
      const newS3Keys = extractNewS3Keys(value, processedMarkdown);

      if (newS3Keys.length > 0) {
        // Reprocess the entire markdown to handle new images
        const reprocessed = await preprocessMarkdown(value);
        setProcessedMarkdown(reprocessed);
      }

      // Check for removed S3 images and delete them from S3
      const removedS3Keys = extractRemovedS3Keys(previousMarkdown, value);
      if (removedS3Keys.length > 0) {
        try {
          await deleteImagesFromS3(removedS3Keys);
          console.log(
            `Deleted ${removedS3Keys.length} unused S3 images:`,
            removedS3Keys
          );
        } catch (error) {
          console.error("Error deleting unused S3 images:", error);
          // Continue with saving even if deletion fails
        }
      }

      // Postprocess the markdown to convert presigned URLs back to S3 keys
      const processedValue = postprocessMarkdown(value);

      await updateArticle({ content: processedValue });

      // Update previous markdown after successful save
      setPreviousMarkdown(processedValue);
      setCurrentMarkdown(processedValue);
      setSyncState("sync");
    } catch (error) {
      console.error("Error in onChange:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde");
      setSyncState("not-sync");
    }
  });

  const onMetadataChange = useDebounceFn(async (field: string, value: any) => {
    await updateArticle({ [field]: value });
  });

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSyncState("not-sync");
    onMetadataChange("title", value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setSyncState("not-sync");
    onMetadataChange("description", value);
  };

  const handleAuthorChange = (value: string) => {
    setAuthor(value);
    setSyncState("not-sync");
    onMetadataChange("author", value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setSyncState("not-sync");
    const updates: any = { status: value };

    if (value === "published" && !publishedAt) {
      updates.published_at = new Date().toISOString();
    }

    updateArticle(updates);
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La taille du fichier doit être inférieure à 5MB");
      return;
    }

    setIsUploadingImage(true);
    setSyncState("syncing");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImageAction({
        formData,
        key: `blog/${articleId}/cover/${nanoid()}.${file.type.split("/")[1]}`,
      });

      await updateArticle({ image: result.key });
      setImageUrl(result.key);
      toast.success("Image de couverture mise à jour");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Erreur lors du téléchargement de l'image");
      setSyncState("not-sync");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    setSyncState("syncing");
    try {
      await updateArticle({ image: null });
      setImageUrl(null);
      toast.success("Image de couverture supprimée");
    } catch (error) {
      console.error("Remove image error:", error);
      toast.error("Erreur lors de la suppression de l'image");
      setSyncState("not-sync");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleTagsChange = (value: string) => {
    setTags(value);
    setSyncState("not-sync");
    const tagArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onMetadataChange("tags", tagArray);
  };

  const handleKeywordsChange = (value: string) => {
    setKeywords(value);
    setSyncState("not-sync");
    const keywordArray = value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);
    onMetadataChange("keywords", keywordArray);
  };

  const handlePublish = async () => {
    setSyncState("syncing");

    try {
      const { error } = await supabase
        .from(type)
        .update({
          status: "published",
          published_at: publishedAt || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId);

      if (error) {
        toast.error("Erreur lors de la publication");
        setSyncState("not-sync");
        return;
      }

      setStatus("published");
      toast.success("Article publié avec succès");
      setSyncState("sync");
    } catch (error) {
      console.error("Error publishing article:", error);
      toast.error("Une erreur est survenue lors de la publication");
      setSyncState("not-sync");
    }
  };

  useEffect(() => {
    if (syncState === "sync") return;

    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return "Êtes-vous sûr de vouloir quitter ? Toutes les modifications non sauvegardées seront perdues.";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [syncState]);

  return (
    <div className="space-y-6">
      {/* Image Section */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-semibold mb-4">Image de couverture</h3>

        {presignedImageUrl ? (
          <div className="relative">
            <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
              <Image
                src={presignedImageUrl}
                alt="Image de couverture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <Button
              onClick={handleRemoveImage}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              disabled={isUploadingImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`relative w-full h-64 border-2 border-dashed rounded-lg transition-colors ${dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
              } ${isUploadingImage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => {
              if (!isUploadingImage) {
                document.getElementById("cover-image-upload")?.click();
              }
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Upload className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">
                {isUploadingImage ? "Téléchargement..." : "Glissez une image ici"}
              </p>
              <p className="text-sm">
                ou cliquez pour sélectionner un fichier
              </p>
              <p className="text-xs mt-2 text-gray-400">
                PNG, JPG, GIF jusqu&apos;à 5MB
              </p>
            </div>
            <input
              id="cover-image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploadingImage}
            />
          </div>
        )}

        {presignedImageUrl && (
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => document.getElementById("cover-image-upload")?.click()}
              variant="outline"
              disabled={isUploadingImage}
            >
              <Upload className="h-4 w-4 mr-2" />
              Remplacer l&apos;image
            </Button>
            <input
              id="cover-image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              disabled={isUploadingImage}
            />
          </div>
        )}
      </div>

      {/* Metadata Section */}
      <div className="border-b pb-6">
        <h3 className="text-lg font-semibold mb-4">
          Métadonnées de l&apos;article
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Titre de l'article"
            />
          </div>

          <div>
            <Label htmlFor="author">Auteur</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              placeholder="Nom de l'auteur"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Description de l'article"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="n8n, automation, workflow"
            />
          </div>

          <div>
            <Label htmlFor="keywords">
              Mots-clés (séparés par des virgules)
            </Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => handleKeywordsChange(e.target.value)}
              placeholder="n8n, automatisation, france"
            />
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            {status === "draft" && (
              <Button onClick={handlePublish} className="w-full">
                Publier l&apos;article
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="relative">
        <h3 className="text-lg font-semibold mb-4">
          Contenu de l&apos;article
        </h3>

        <div className="absolute top-2 right-2 z-10">
          <Badge variant={getBadgeVariant(syncState)}>{syncState}</Badge>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {processedMarkdown ? (
            <InitializedMDXEditor
              key={`${articleId}-${processedMarkdown.slice(0, 100)}`}
              onChange={(value) => {
                setSyncState("not-sync");
                onContentChange(value);
              }}
              articleId={articleId}
              markdown={processedMarkdown}
            />
          ) : (
            <div className="p-8 text-center text-gray-500">
              Chargement de l&apos;éditeur...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
