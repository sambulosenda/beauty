"use client";

import { notFound, useParams } from "next/navigation";
import { useBusiness } from "@/hooks/queries/use-business";
import { BusinessContent } from "./business-content";
import { BusinessSkeletonLoader } from "./business-skeleton";
import React from "react";

export default function BusinessPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, error } = useBusiness(slug);

  console.log("Business data:", data);

  if (isLoading) {
    return <BusinessSkeletonLoader />;
  }

  if (error || !data?.business) {
    notFound();
  }

  return (
    <BusinessContent business={data.business} services={data.services || []} />
  );
}
