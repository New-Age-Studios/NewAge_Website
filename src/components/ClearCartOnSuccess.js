"use client";

import { useEffect } from "react";
import { clearCartCookie } from "@/app/actions/cart";

export default function ClearCartOnSuccess() {
  useEffect(() => {
    // Fire and forget the server action to clear the cart cookie
    // This allows the success page to display the paid basket on initial load,
    // but ensures the user gets a fresh basket for any new purchases.
    clearCartCookie().catch(() => {});
  }, []);

  return null;
}
