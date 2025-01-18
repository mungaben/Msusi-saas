import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function TransctionssLoading() {
  return (
    <>
      <DashboardHeader
        heading="Transctionss"
        text="Check and manage your latest Transctionss."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
