import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export const metadata = constructMetadata({
  title: "Transactions – msusi-saas",
  description: "Check and manage your latest transactions.",
});

export default async function TransctionsPage() {
  // const user = await getCurrentUser();
  // if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Transactions"
        text="Check and manage your latest transactions."
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>Transactions</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any transactions yet. Start ordering a product.
        </EmptyPlaceholder.Description>
        <Button>Buy Products</Button>
      </EmptyPlaceholder>
    </>
  );
}
