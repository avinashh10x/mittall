import type { Metadata } from "next";
import { EditSuite } from "@/components/EditSuite";

export const metadata: Metadata = { title: "Cinematographer" };

export default function CinematographerPage() {
  return <EditSuite />;
}
