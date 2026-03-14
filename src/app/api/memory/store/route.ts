import { NextResponse } from 'next/server';
import lighthouse from '@lighthouse-web3/sdk';

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

    // Convert JSON to string and upload directly
    const jsonString = JSON.stringify(payload);
    const uploadResponse = await lighthouse.uploadText(jsonString, apiKey);

    return NextResponse.json({
      success: true,
      cid: uploadResponse.data.Hash,
      url: `https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`
    });

  } catch (error: any) {
    console.error('Error uploading to Filecoin via Lighthouse:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
