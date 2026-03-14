import { NextResponse } from 'next/server';
import lighthouse from '@lighthouse-web3/sdk';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, memoryType, data } = body;

    if (!agentId || !memoryType || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const payload = JSON.stringify({ agentId, memoryType, data, timestamp: Date.now() });
    
    const apiKey = process.env.LIGHTHOUSE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Lighthouse API Key' }, { status: 500 });
    }

    const name = `memory-${agentId}-${Date.now()}.json`;
    
    // Lighthouse SDK text upload
    const response = await lighthouse.uploadText(payload, apiKey, name);

    return NextResponse.json({ 
      success: true,
      cid: response.data.Hash, 
      url: `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}` 
    });
  } catch (error: any) {
    console.error('Error uploading to Lighthouse:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
