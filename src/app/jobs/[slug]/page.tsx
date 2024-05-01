import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import MainWidthWrapper from "@/components/main-width-wrapper";
import JobsDetailsPage from "@/components/_shared/jobs-details-page";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) {
    return notFound();
  }

  return job;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: job.title,
  };
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });
  return jobs.map(({ slug }) => slug);
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationUrl, applicationEmail } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link and email");
    notFound();
  }
  return (
    <MainWidthWrapper className="flex flex-col items-center gap-5 p-3 md:flex-row md:items-start">
      <JobsDetailsPage job={job} />
      <Button asChild>
        <a href={applicationLink} className="w-40 md:w-fit">
          Apply Now
        </a>
      </Button>
    </MainWidthWrapper>
  );
}
