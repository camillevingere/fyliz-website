"use server";

import { env } from "@/lib/env";
import type { VisitorProperties } from "./utils";
import { EventName, sendinblueEnabled } from "./utils";

/**
 * Tracks an event
 */
export async function track(
  eventName: EventName | string,
  properties?: VisitorProperties,
  eventData?: {
    id?: string;
    data?: { [key: string]: string };
  },
) {
  if (sendinblueEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[sendinblue.track]", eventName, properties, eventData);
    }
    const BREVO_API_KEY = env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      throw new Error("Brevo API Key not configured properly");
    }

    const url = "https://api.brevo.com/v3/events";
    const data = {
      event_name: eventName,
      identifiers: { email_id: properties?.email },
      contact_properties: {
        PRENOM: properties?.PRENOM,
      },
      event_properties: {
        id: eventData?.id,
        urlWithCoupon: eventData?.data?.urlWithCoupon,
        workflowUrl: eventData?.data?.workflowUrl,
      },
    };

    // Définir les options pour fetch
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(data),
    };

    // Utilisation de fetch pour faire une requête POST
    const response = await fetch(url, options);

    if (
      response.status !== 201 &&
      response.status !== 204 &&
      response.status !== 200
    ) {
      console.error("Il y a eu une erreur", response);
      throw new Error("Il y a eu une erreur");
    }
  }
}
