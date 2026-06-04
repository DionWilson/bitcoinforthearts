import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

/**
 * Diagnostic endpoint for the Airtable Contacts integration.
 *
 * Usage:
 *   GET /api/admin/airtable-health
 *
 * Authentication:
 *   Protected by the project's existing HTTP Basic Auth middleware
 *   (see proxy.ts) — the same ADMIN_USER / ADMIN_PASS used for
 *   /admin/applications. No additional secret needed.
 *
 * What it returns:
 *   - Validates env var presence and shape (without leaking the PAT itself).
 *   - Performs a real READ against the configured base + table.
 *   - Returns the raw Airtable HTTP status + response body.
 *   - Provides a plain-English diagnosis based on the status code.
 *
 * Safe to remove after the integration is verified working. This file
 * is an isolated diagnostic and is not referenced anywhere else in the app.
 */
export async function GET(_req: NextRequest) {
  const pat = getEnv('AIRTABLE_PAT');
  const baseId = getEnv('AIRTABLE_BASE_ID');
  const tableName = getEnv('AIRTABLE_CONTACTS_TABLE') ?? 'Contacts';
  const tableEnvSet = !!getEnv('AIRTABLE_CONTACTS_TABLE');

  const config = {
    has_AIRTABLE_PAT: !!pat,
    pat_starts_with: pat ? pat.slice(0, 4) : null,
    pat_length: pat ? pat.length : 0,
    has_AIRTABLE_BASE_ID: !!baseId,
    base_id_value: baseId ?? null,
    base_id_length: baseId ? baseId.length : 0,
    base_id_format_ok: baseId ? /^app[a-zA-Z0-9]{14}$/.test(baseId) : false,
    AIRTABLE_CONTACTS_TABLE_set_in_vercel: tableEnvSet,
    table_name_being_used: tableName,
  };

  if (!pat || !baseId) {
    return NextResponse.json({
      ok: false,
      step: 'config_check',
      config,
      error: 'Missing AIRTABLE_PAT or AIRTABLE_BASE_ID env var.',
    });
  }

  const readUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?maxRecords=1`;

  let readResponse: Response;
  try {
    readResponse = await fetch(readUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${pat}` },
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      step: 'read_test',
      config,
      error: `Network error during read: ${String(err)}`,
    });
  }

  const readBodyRaw = await readResponse.text();

  return NextResponse.json({
    ok: readResponse.ok,
    step: 'read_test',
    config,
    read_test: {
      status: readResponse.status,
      ok: readResponse.ok,
      body: readBodyRaw.slice(0, 4000),
    },
    diagnosis: diagnose(readResponse.status, pat),
  });
}

function diagnose(status: number, pat: string): string {
  if (status === 200) {
    return 'READ SUCCEEDED. Base + table + PAT read permissions all valid. If signups are still failing, the issue is field schema or PAT lacks data.records:write scope. Verify by re-checking the PAT scopes in Airtable Developer Hub.';
  }
  if (status === 404) {
    return 'NOT_FOUND (404). Three possible causes, in order of likelihood: (1) The PAT does NOT have access to this base — Airtable returns 404 instead of 403 to obscure base existence; check the PAT in Airtable Developer Hub and verify the Grant & Donor Management Hub base appears under Access. (2) AIRTABLE_BASE_ID is wrong — verify it matches the app... segment of the base URL exactly. (3) The table name does not exist in the base — verify table_name_being_used (above) matches an existing tab.';
  }
  if (status === 401) {
    const looksLikeOldKey = pat.startsWith('key');
    if (looksLikeOldKey) {
      return 'UNAUTHORIZED (401). The PAT in your env var starts with "key" — this is a deprecated Airtable API key, not a Personal Access Token. Airtable removed support for API keys in 2024. Generate a new PAT in Airtable Developer Hub and replace the value in Vercel.';
    }
    return 'UNAUTHORIZED (401). The PAT is invalid, expired, or malformed. Generate a fresh PAT in Airtable Developer Hub and replace the value in Vercel.';
  }
  if (status === 403) {
    return 'FORBIDDEN (403). The PAT is valid but lacks the data.records:read scope. Edit the PAT in Airtable Developer Hub and add the scope.';
  }
  if (status === 422) {
    return 'UNPROCESSABLE ENTITY (422). Read should not normally return this. Check the body field for the specific reason.';
  }
  return `Unexpected status ${status}. Read the body field for Airtable's specific error message.`;
}
