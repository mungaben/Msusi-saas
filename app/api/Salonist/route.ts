import { Location } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from "@/lib/db";
import { SalonistStatus } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
// find available salonits
  const salonist = await prisma.salonist.findMany({
    where: {
        status: SalonistStatus.AVAILABLE,
    }
  })
  if (!salonist) {
    return NextResponse.json({ message: "No salonists found" }, { status: 404 })
  }

  return NextResponse.json(salonist)
}