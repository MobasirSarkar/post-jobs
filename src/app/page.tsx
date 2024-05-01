import H1 from "@/components/_shared/H1";
import JobFilterSidebar from "@/components/_shared/job-filter-sidebar";
import JobResult from "@/components/jobs/job-results";
import MainWidthWrapper from "@/components/main-width-wrapper";
import { JobFilterValue } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValue) {
  const titlePrefix = q
    ? `${q} Jobs`
    : type
      ? `${type} Developer jobs`
      : remote
        ? "Remote Developer jobs"
        : "All Developer Jobs";
  const titleSuffix = location ? `in ${location}` : "";

  return `${titleSuffix}${titlePrefix}`;
}
export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Post Jobs`,
  };
}
export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: JobFilterValue = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <MainWidthWrapper>
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find Your Dream Job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row ">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResult
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </MainWidthWrapper>
  );
}
