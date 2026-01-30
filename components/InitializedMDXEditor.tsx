"use client";
import { uploadImageAction } from "@/lib/images.action";
import type { JsxComponentDescriptor } from "@mdxeditor/editor";
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  GenericJsxEditor,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  jsxPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  ShowSandpackInfo,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import styles from "./mdx-editor-theme.module.css";

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: "Callout",
    kind: "flow",
    source: "./Callout.tsx",
    props: [
      {
        name: "type",
        type: "string",
      },
    ],
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
];

export interface InitializedMDXEditorProps extends MDXEditorProps {
  articleId: string;
  type?: string;
}

export function InitializedMDXEditor({
  articleId,
  type = "articles",
  ...props
}: InitializedMDXEditorProps) {
  return (
    <MDXEditor
      className={styles.theme}
      contentEditableClassName="prose dark:prose-invert max-w-none"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            jsx: "JSX",
            ts: "TypeScript",
            tsx: "TSX",
            css: "CSS",
            html: "HTML",
            json: "JSON",
            bash: "Bash",
            python: "Python",
            yaml: "YAML",
          },
        }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin(),
        linkPlugin(),
        imagePlugin({
          imageUploadHandler: async (file: File) => {
            try {
              const formData = new FormData();
              formData.append("file", file);

              console.log("Uploading image:", file.name);

              // Determine folder based on type
              let folder = "blog";
              if (type === "customer_cases") {
                folder = "cas-clients";
              } else if (type === "n8n_workflows") {
                folder = "automatisations-n8n";
              }

              const result = await uploadImageAction({
                formData,
                key: `${folder}/${articleId}/${nanoid()}.${file.type.split("/")[1]}`,
              });

              toast.success("Image téléchargée avec succès");
              return result.key;
            } catch (error) {
              toast.error("Erreur lors du téléchargement de l'image");
              console.error("Image upload error:", error);
              throw error;
            }
          },
          imageAutocompleteSuggestions: [
            "https://picsum.photos/800/400",
            "https://picsum.photos/400/300",
          ],
        }),
        jsxPlugin({ jsxComponentDescriptors }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertCodeBlock />
                        <InsertImage />
                      </>
                    ),
                  },
                ]}
              />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
    />
  );
}
