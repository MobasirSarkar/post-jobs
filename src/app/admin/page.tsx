import React from "react";
import prisma from "@/lib/prisma";
import MainWidthWrapper from "@/components/main-width-wrapper";
import H1 from "@/components/_shared/H1";
import Link from "next/link";
import JobListItems from "@/components/job-list-items";

export default async function AdminPage() {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });
  return (
    <MainWidthWrapper>
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Uapproved Jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
            <JobListItems job={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">No Uapproved Jobs</p>
        )}
      </section>
    </MainWidthWrapper>
  );
}
