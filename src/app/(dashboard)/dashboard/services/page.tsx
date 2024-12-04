import { ServicesContent } from "@/components/services/service-content";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function ServicesPage() {
    const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in")
  }

  return <ServicesContent />
}