import JobsDetailsPage from "@/components/_shared/jobs-details-page";
import MainWidthWrapper from "@/components/main-width-wrapper";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSideBar from "./admin-sidebar";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <MainWidthWrapper className="flex flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobsDetailsPage job={job} />
      <AdminSideBar job={job} />
    </MainWidthWrapper>
  );
}
