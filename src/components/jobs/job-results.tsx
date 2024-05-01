import { JobFilterValue } from "@/lib/validation";
import JobListItems from "../job-list-items";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import JobsDetailsPage from "../_shared/jobs-details-page";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightLeftIcon,
} from "lucide-react";

interface JobResultProps {
  filterValues: JobFilterValue;
  page?: number;
}
export default async function JobResult({
  filterValues,
  page = 1,
}: JobResultProps) {
  const { q, type, location, remote } = filterValues;

  const jobPerPage = 6;

  const skip = (page - 1) * jobPerPage;

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
  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobPerPage,
    skip,
  });
  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItems job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          {" "}
          No Jobs Found . Try Different Filters
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPage={Math.ceil(totalResults / jobPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  filterValues: JobFilterValue;
}

function Pagination({
  currentPage,
  totalPage,
  filterValues: { q, location, remote, type },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `/?${searchParams.toString()}`;
  }
  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeftIcon size={16} />
        Previous Page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPage}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPage && "invisible",
        )}
      >
        Next Page
        <ArrowRightIcon size={16} />
      </Link>
    </div>
  );
}
