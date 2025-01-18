import { Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SalesMade() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales Made</CardTitle>
        <Users className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+123000</div>
        <p className="text-xs text-muted-foreground"> 10% Sales Made</p>
      </CardContent>
    </Card>
  )
}
