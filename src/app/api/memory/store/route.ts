import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Validate payload
    if (!payload.agentId || !payload.memoryType || !payload.data) {
      return NextResponse.json(
        { error: 'Missing required fields: agentId, memoryType, data' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIGHTHOUSE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing Lighthouse API Key' },
        { status: 500 }
      );
    }

    // Convert JSON to string and create a Blob
    const jsonString = JSON.stringify(payload);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Append to FormData
    const formData = new FormData();
    formData.append('file', blob, 'memory.json');

    // Upload directly using native fetch to bypass Vercel SDK conflicts
    const response = await fetch('https://node.lighthouse.storage/api/v0/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lighthouse API Error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();

    return NextResponse.json({
      success: true,
      cid: responseData.Hash,
      url: `https://gateway.lighthouse.storage/ipfs/${responseData.Hash}`
    });

  } catch (error: any) {
    console.error('Error uploading to Filecoin via Lighthouse REST API:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
