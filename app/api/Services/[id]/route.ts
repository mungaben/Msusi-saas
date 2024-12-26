import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const service = await prisma.service.findUnique({
        where: {
            id: id,
        },
    });
    if (!service) {
        return NextResponse.json({ message: "No service found" }, { status: 404 })
    }

    return NextResponse.json(service)
}