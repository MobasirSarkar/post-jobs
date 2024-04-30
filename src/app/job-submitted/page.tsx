import H1 from "@/components/_shared/H1";
import MainWidthWrapper from "@/components/main-width-wrapper";

export default function Page() {
  return (
    <MainWidthWrapper className="text-center">
      <H1>Job submitted</H1>
      <p>Your job postin has been submitted and is pending approval</p>
    </MainWidthWrapper>
  );
}
