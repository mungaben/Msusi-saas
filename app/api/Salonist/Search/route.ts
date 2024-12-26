import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    // Get query parameters
    const name = searchParams.get("name");
    const specialty = searchParams.get("specialty");
    const minRating = searchParams.get("minRating");
    const available = searchParams.get("available");
    
    // Build where clause
    const where: any = {};
    
    // Join with User table to search by name
    if (name) {
      where.user = {
        name: {
          contains: name,
          mode: 'insensitive', // Case insensitive search
        },
      };
    }

    if (specialty) {
      where.specialties = {
        has: specialty,
      };
    }

    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating),
      };
    }

    if (available === 'true') {
      where.status = 'AVAILABLE';
    }

    const salonists = await prisma.salonist.findMany({
      where,
      include: {
        user: true,
        availability: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return NextResponse.json(salonists);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}