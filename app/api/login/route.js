// Client login endpoint.
// Accounts are issued manually by heroo; there is no user database yet,
// so every attempt is rejected. Replace this with real verification
// (e.g. hashed passwords in a DB + a signed session cookie) when the
// client portal is built.
export async function POST(request) {
  try {
    await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Constant delay so responses don't hint at anything.
  await new Promise((r) => setTimeout(r, 700));

  return Response.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });
}
