import type { Metadata } from "next";
import { PhotoTimeline } from "@/components/PhotoTimeline";

export const metadata: Metadata = { title: "Photographer" };

export default function PhotographerPage() {
  return <PhotoTimeline />;
}
