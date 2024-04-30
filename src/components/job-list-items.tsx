import React from "react";
import { Job } from "@prisma/client";
import Image from "next/image";
import companyPlaceLogo from "@/assets/company-logo-placeholder.png";
import { Briefcase, Globe2, MapPin, Banknote, Clock } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface JobListItemsProps {
  job: Job;
}

export default function JobListItems({
  job: {
    title,
    companyName,
    type,
    localType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemsProps) {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyPlaceLogo}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg "
      />
      <div className="flex-grow space-y-3">
        <div className="">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {localType}
          </p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "WorldWide"}
          </p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge variant={"outline"}>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
