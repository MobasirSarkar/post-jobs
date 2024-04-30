import { JobFilterValue } from "@/lib/validation";
import JobListItems from "../job-list-items";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface JobResultProps {
  filterValues: JobFilterValue;
}
export default async function JobResult({
  filterValues: { q, type, location, remote },
}: JobResultProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { localType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { localType: "Remote" } : {},
      { approved: true },
    ],
  };
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItems job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          {" "}
          No Jobs Found . Try Different Filters
        </p>
      )}
    </div>
  );
}
