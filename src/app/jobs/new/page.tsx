import { Metadata } from "next";
import NewJobForm from "./_components/new-job-form";

export const metadata: Metadata = {
  title: "Post a New Job",
};

export default function Page() {
  return <NewJobForm />;
}
