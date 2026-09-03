import { NextResponse } from 'next/server';

// Meta Webhook Verification Handler
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return new NextResponse('Bad Request', { status: 400 });
}

// Incoming Message Handler
export async function POST(request) {
  try {
    const body = await request.json();

    // Check if the payload is from WhatsApp Cloud API
    if (body.object === 'whatsapp_business_account') {
      
      // Navigate the complex WhatsApp JSON payload to extract the actual message
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;

      if (messages && messages[0]) {
        const phone_number_id = value.metadata.phone_number_id;
        const from = messages[0].from; // The sender's phone number
        const msg_body = messages[0].text?.body || "[Non-text message received (e.g. image/audio)]";

        console.log(`[WHATSAPP] Message received from ${from}: ${msg_body}`);

        // --- 1. DB Logging (Mock logic for now) ---
        console.log(`[DB] Saving incoming message from ${from} to database...`);
        // e.g. await prisma.message.create({ ... })

        // --- 2. Forwarding (Slack / Discord webhook) ---
        if (process.env.SLACK_WEBHOOK_URL) {
          try {
            await fetch(process.env.SLACK_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                text: `🚨 *New WhatsApp Message*\n*From:* ${from}\n*Message:* ${msg_body}` 
              })
            });
            console.log(`[FORWARD] Message forwarded to Slack`);
          } catch (e) {
            console.error(`[FORWARD_ERROR] Failed to forward message:`, e);
          }
        }

        // --- 3. Auto-Reply ---
        const token = process.env.WHATSAPP_TOKEN;
        if (token) {
          const replyText = "Thanks for reaching out to Pixel-Dev Solution! The system has logged your message and a team member will reply shortly. \n\n_Note: This is an automated response._";
          
          try {
            const response = await fetch(`https://graph.facebook.com/v17.0/${phone_number_id}/messages`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: from,
                text: { body: replyText }
              })
            });
            
            if (response.ok) {
              console.log(`[WHATSAPP] Auto-reply sent to ${from}`);
            } else {
              console.error(`[WHATSAPP_ERROR] Failed to send auto-reply:`, await response.text());
            }
          } catch (e) {
            console.error(`[WHATSAPP_ERROR] Fetch error:`, e);
          }
        } else {
          console.warn(`[WHATSAPP_WARNING] WHATSAPP_TOKEN is missing from .env. Auto-reply skipped.`);
        }
      }
      
      // Always return a 200 OK to Meta so they know we received the event
      return new NextResponse('EVENT_RECEIVED', { status: 200 });
    } else {
      return new NextResponse('Not Found', { status: 404 });
    }
  } catch (error) {
    console.error('[WEBHOOK_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
