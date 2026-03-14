import { NextResponse } from 'next/server';
import axios from 'axios';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agentId, memoryType, data } = body;

    if (!agentId || !memoryType || !data) {
      return NextResponse.json({ error: "Missing required fields: agentId, memoryType, data" }, { status: 400 });
    }

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
    formData.append('file', blob);

    const response = await axios.post('https://node.lighthouse.storage/api/v0/add', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.LIGHTHOUSE_API_KEY}`
      }
    });

    return NextResponse.json({ success: true, cid: response.data.Hash });
  } catch (error: any) {
    console.error("Axios upload error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 });
  }
}
