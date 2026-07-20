import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken === "BU_YERGA_BOT_TOKENNI_YOZING") {
      console.warn("Telegram credentials missing, simulating success for demo.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const message = `🌟 <b>Yangi Buyurtma!</b>\n\n👤 <b>Mijoz:</b> ${name}\n📞 <b>Telefon:</b> ${phone}\n\n<i>Sayt orqali yuborildi</i>`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.description || 'Failed to send message to Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Telegram API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
