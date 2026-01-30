import Stripe from "stripe";
import { env } from "../env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});

/**
 * Determine the tax type based on the country code
 * @param country ISO country code (e.g., "FR", "US", "GB")
 * @returns Stripe tax ID type
 */
export function getTaxTypeFromCountry(
  country: string,
): Stripe.TaxIdCreateParams.Type {
  const countryUpper = country.toUpperCase();

  // Map of country codes to Stripe tax ID types
  const taxTypeMap: Record<string, Stripe.TaxIdCreateParams.Type> = {
    // European Union VAT
    AT: "eu_vat",
    BE: "eu_vat",
    BG: "eu_vat",
    HR: "eu_vat",
    CY: "eu_vat",
    CZ: "eu_vat",
    DK: "eu_vat",
    EE: "eu_vat",
    FI: "eu_vat",
    FR: "eu_vat",
    DE: "eu_vat",
    GR: "eu_vat",
    HU: "eu_vat",
    IE: "eu_vat",
    IT: "eu_vat",
    LV: "eu_vat",
    LT: "eu_vat",
    LU: "eu_vat",
    MT: "eu_vat",
    NL: "eu_vat",
    PL: "eu_vat",
    PT: "eu_vat",
    RO: "eu_vat",
    SK: "eu_vat",
    SI: "eu_vat",
    ES: "eu_vat",
    SE: "eu_vat",
    // United Kingdom
    GB: "gb_vat",
    // Switzerland
    CH: "ch_vat",
    // Canada
    CA: "ca_bn",
    // Australia
    AU: "au_abn",
    // New Zealand
    NZ: "nz_gst",
    // India
    IN: "in_gst",
    // Japan
    JP: "jp_cn",
    // Singapore
    SG: "sg_gst",
    // Hong Kong
    HK: "hk_br",
    // South Africa
    ZA: "za_vat",
    // Mexico
    MX: "mx_rfc",
    // Brazil
    BR: "br_cnpj",
    // Argentina
    AR: "ar_cuit",
    // Chile
    CL: "cl_tin",
    // United States
    US: "us_ein",
    // Norway
    NO: "no_vat",
    // Russia
    RU: "ru_inn",
    // South Korea
    KR: "kr_brn",
    // Taiwan
    TW: "tw_vat",
    // Thailand
    TH: "th_vat",
    // Malaysia
    MY: "my_sst",
    // Indonesia
    ID: "id_npwp",
    // Philippines
    PH: "ph_tin",
    // Turkey
    TR: "tr_tin",
    // Israel
    IL: "il_vat",
    // Saudi Arabia
    SA: "sa_vat",
    // United Arab Emirates
    AE: "ae_trn",
    // Egypt
    EG: "eg_tin",
    // Iceland
    IS: "is_vat",
    // Liechtenstein
    LI: "li_uid",
  };

  return taxTypeMap[countryUpper] || "eu_vat"; // Default to eu_vat if country not found
}
