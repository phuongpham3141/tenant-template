import { redirect } from "next/navigation";

// Feature removed — keep the route so existing deep links / form posts
// resolve gracefully to the maintenance notice instead of 404.
export default function SellOnCsrRemoved() {
  redirect("/info/maintenance");
}
