import { ServiceDetails } from "./service-details";
import React from "react";


interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  return <ServiceDetails id={id} />;
}
