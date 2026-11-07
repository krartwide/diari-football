import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  const syncCode = req.nextUrl.searchParams.get("syncCode")?.trim();
  if (!syncCode) {
    return NextResponse.json({ error: "syncCode required" }, { status: 400 });
  }
  try {
    const rows = await sql<{
      id: string;
      record_type: string;
      payload: unknown;
    }>(
      `select id, record_type, payload from saved_records
       where sync_code = $1
       order by created_at desc
       limit 200`,
      [syncCode],
    );
    const matches = rows
      .filter((r) => r.record_type === "match")
      .map((r) => r.payload);
    const series = rows
      .filter((r) => r.record_type === "series")
      .map((r) => r.payload);
    return NextResponse.json({ matches, series });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ matches: [], series: [], offline: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      syncCode?: string;
      type?: "match" | "series";
      payload?: { id?: string };
    };
    const syncCode = body.syncCode?.trim();
    const type = body.type;
    const payload = body.payload;
    if (!syncCode || !type || !payload?.id) {
      return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }
    await sql(
      `insert into saved_records (id, sync_code, record_type, payload)
       values ($1, $2, $3, $4::jsonb)
       on conflict (id) do update set payload = excluded.payload, sync_code = excluded.sync_code`,
      [payload.id, syncCode, type, JSON.stringify(payload)],
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, offline: true });
  }
}
