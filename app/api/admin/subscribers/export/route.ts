import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthed } from '@/lib/adminAuthServer';
import { listAllForExport, subscribersToCsv, StatusFilter } from '@/lib/subscribersDb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAdminRequestAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const raw = request.nextUrl.searchParams.get('status');
  const status: StatusFilter = raw === 'active' || raw === 'inactive' ? raw : 'all';
  try {
    const list = await listAllForExport(status);
    const csv = '﻿' + subscribersToCsv(list); // BOM so Excel opens it as UTF-8
    const stamp = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="numrexo-subscribers-${status}-${stamp}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Could not export subscribers' }, { status: 500 });
  }
}
