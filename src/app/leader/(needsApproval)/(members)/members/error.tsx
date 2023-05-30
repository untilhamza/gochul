"use client";

import ErrorPageDetails from "@/components/error/ErrorPageDetails";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  //TODO: do something with the error
  return <ErrorPageDetails onReload={reset} />;
}
