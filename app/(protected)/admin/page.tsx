import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";
import SalesMade from "@/components/dashboard/SalesMade";
import NewAgents from "@/components/dashboard/NewAgents";
import ProfitMade from "@/components/dashboard/ProfitMade";

export const metadata = constructMetadata({
  title: "Admin – Msusi SaaS",
  description: "Admin panel for Msusi SaaS",
});

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text="Access only for users with ADMIN role."
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard />
          <ProfitMade/>
          <NewAgents />
          <SalesMade />
        </div>
        <TransactionsList />
        <TransactionsList />
      </div>
    </>
  );
}
