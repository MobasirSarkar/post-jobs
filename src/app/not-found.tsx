import H1 from "@/components/_shared/H1";
import MainWidthWrapper from "@/components/main-width-wrapper";
import React from "react";

export default function NotFound() {
  return (
    <MainWidthWrapper className="text-center">
      <H1>Not Found</H1>
      <p>Sorry,The page you are looking is not here</p>
    </MainWidthWrapper>
  );
}
