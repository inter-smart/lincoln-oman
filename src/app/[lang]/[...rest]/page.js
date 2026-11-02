import { notFound } from "next/navigation";

// Any URL that matches no route lands here, so it renders the designed
// not-found.js inside the [lang] layout (header/footer) with a real 404.
export default function CatchAll() {
  notFound();
}
