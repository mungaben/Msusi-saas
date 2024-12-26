

import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const salonist = await prisma.salonist.findUnique({
        where: {
            id: id,
        },
    });
    if (!salonist) {
        return NextResponse.json({ message: "No salonist found" }, { status: 404 })
    }

    return NextResponse.json(salonist)
}