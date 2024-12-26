import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest) {
// find available salonits
  const services = await prisma.service.findMany({
    
  })
  if (!services) {
    return NextResponse.json({ message: "No services found" }, { status: 404 })
  }
  

  return NextResponse.json(services)
}