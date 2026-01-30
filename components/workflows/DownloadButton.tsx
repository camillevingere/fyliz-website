"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { track } from "@/lib/brevo/brevo.action";
import { EventName, identify } from "@/lib/brevo/utils";
import { createCouponN8nWorkflow } from "@/lib/stripe/stripe.action";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    sendinblue?: {
      identify: (email: string, properties?: Record<string, string>) => void;
    };
  }
}

interface DownloadButtonProps {
  workflowJson: string | object | null;
  workflowName: string;
  workflowSlug: string;
}

const EMAIL_STORAGE_KEY = "n8n-workflow-email";
const NAME_STORAGE_KEY = "n8n-workflow-name";

export default function DownloadButton({
  workflowJson,
  workflowName,
  workflowSlug,
}: DownloadButtonProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load cached email and name from localStorage
    const cachedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    const cachedName = localStorage.getItem(NAME_STORAGE_KEY);
    if (cachedEmail) {
      setEmail(cachedEmail);
    }
    if (cachedName) {
      setName(cachedName);
    }
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDownload = async () => {
    if (!email) {
      setError("Veuillez entrer votre email");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }
    if (!name || name.trim() === "") {
      setError("Veuillez entrer votre prénom");
      return;
    }
    if (name.trim().length < 3) {
      setError("Le prénom doit contenir au moins 3 lettres");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if email and name are already in localStorage (form already submitted)
      const cachedEmail =
        typeof window !== "undefined"
          ? localStorage.getItem(EMAIL_STORAGE_KEY)
          : null;
      const cachedName =
        typeof window !== "undefined"
          ? localStorage.getItem(NAME_STORAGE_KEY)
          : null;
      const isAlreadySubmitted = cachedEmail === email && cachedName === name;

      if (!isAlreadySubmitted) {
        // Identify user on client side
        if (typeof window !== "undefined") {
          identify(email, { email: email });
        }

        // Call server action
        const coupon = await createCouponN8nWorkflow();
        // Send signal to Brevo to send the marketing emails
        await track(
          EventName.DOWNLOAD_WORKFLOW_N8N,
          { email: email, PRENOM: name },
          {
            id: coupon.id,
            data: {
              urlWithCoupon: `https://codympia.com/formations/usine-seo?couponId=${coupon.id}`,
              workflowUrl: `https://fyliz.com/automatisations-n8n/${workflowSlug}`,
            },
          },
        );

        // Save email and name to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(EMAIL_STORAGE_KEY, email);
          localStorage.setItem(NAME_STORAGE_KEY, name);
        }
      }

      // Download the JSON file
      // Ensure workflowJson is a string (parse if it's already an object)
      let jsonString: string;
      if (typeof workflowJson === "string") {
        // If it's already a string, try to parse and re-stringify to ensure valid JSON
        try {
          const parsed = JSON.parse(workflowJson);
          jsonString = JSON.stringify(parsed, null, 2);
        } catch {
          // If parsing fails, use as-is
          jsonString = workflowJson;
        }
      } else {
        // If it's an object, stringify it
        jsonString = JSON.stringify(workflowJson, null, 2);
      }

      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${workflowName}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = async () => {
    // If email and name are cached, download directly
    const cachedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    const cachedName = localStorage.getItem(NAME_STORAGE_KEY);
    if (cachedEmail && cachedName) {
      setEmail(cachedEmail);
      setName(cachedName);
      await handleDownload();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-default shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-primary hover:bg-primary/90"
        style={{ color: "#ffffff" }}
      >
        {isLoading ? "Téléchargement..." : "Télécharger gratuitement"}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => {
            setIsOpen(false);
            setError("");
          }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Télécharger le workflow</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Entrez votre email pour recevoir le workflow n8n.
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">Prénom *</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre prénom"
                  className="mt-1"
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setError("");
                  }}
                  disabled={isLoading}
                  className="btn btn-md rounded-default shadow-xs"
                  style={{
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #e5e7eb",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = "#e5e7eb";
                      e.currentTarget.style.color = "#1f2937";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                      e.currentTarget.style.color = "#374151";
                    }
                  }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={
                    isLoading ||
                    !email ||
                    !isValidEmail(email) ||
                    !name ||
                    name.trim() === "" ||
                    name.trim().length < 3
                  }
                  className="btn btn-md btn-primary rounded-default shadow-xs"
                  style={{ color: "#ffffff" }}
                >
                  {isLoading ? "Téléchargement..." : "Télécharger"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
