import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Vercel Cron requests are GET requests
export async function GET(request: Request) {
  // Check authorization if Vercel CRON_SECRET is set
  // This is optional but recommended for security
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Ping the database by requesting a single record from a public table
    // 'hero' table is public and usually contains at least one record
    const { data, error } = await supabase.from('hero').select('id').limit(1);

    if (error) {
      console.error('Keep-alive cron error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase is awake', 
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
