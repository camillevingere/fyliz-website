"use server";

import { stripe } from "./stripe";

/**
 * Creates a coupon for n8n workflows
 */
export async function createCouponN8nWorkflow() {

  // Create unique coupon for the user
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 4);

  const coupon = await stripe.coupons.create({
    duration: "forever",
    percent_off: 50,
    redeem_by: Math.floor(oneWeekFromNow.getTime() / 1000),
  });

  // Return only serializable data (plain object)
  return {
    id: coupon.id,
  };
}
