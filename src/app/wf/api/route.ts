import { NextRequest, NextResponse } from "next/server";

let data = [
  {
    id: "1",
    type: "input",
    data: {
      label: "Hello",
    },
    position: { x: 250, y: 5 },
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "2",
    data: {
      label: "World",
    },
    position: { x: 100, y: 100 },
  },
];

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  data.push(body);
  return NextResponse.json(body);
}
