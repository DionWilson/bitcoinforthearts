// Lightweight Bitcoin on-chain address validation (mainnet).
//
// - Accepts legacy Base58 (P2PKH "1...", P2SH "3...") by character/length checks.
// - Validates Bech32/Bech32m checksum for segwit/taproot ("bc1...").
//
// Note: This intentionally does NOT support Lightning invoices or LNURL.

const BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE58_RE = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

// Bech32 charset per BIP-173.
const BECH32_CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const BECH32_CHARKEY: Record<string, number> = Object.fromEntries(
  [...BECH32_CHARSET].map((c, i) => [c, i]),
);

const BECH32M_CONST = 0x2bc830a3;

function bech32Polymod(values: number[]) {
  let chk = 1;
  for (const v of values) {
    const top = chk >>> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    if (top & 1) chk ^= 0x3b6a57b2;
    if (top & 2) chk ^= 0x26508e6d;
    if (top & 4) chk ^= 0x1ea119fa;
    if (top & 8) chk ^= 0x3d4233dd;
    if (top & 16) chk ^= 0x2a1462b3;
  }
  return chk >>> 0;
}

function bech32HrpExpand(hrp: string) {
  const ret: number[] = [];
  for (let i = 0; i < hrp.length; i++) ret.push(hrp.charCodeAt(i) >> 5);
  ret.push(0);
  for (let i = 0; i < hrp.length; i++) ret.push(hrp.charCodeAt(i) & 31);
  return ret;
}

function bech32VerifyChecksum(hrp: string, data: number[]) {
  const chk = bech32Polymod([...bech32HrpExpand(hrp), ...data]);
  if (chk === 1) return 'bech32' as const;
  if (chk === BECH32M_CONST) return 'bech32m' as const;
  return null;
}

function bech32Decode(input: string) {
  // Bech32 is case-insensitive but must not mix cases.
  const hasLower = input.toLowerCase() === input;
  const hasUpper = input.toUpperCase() === input;
  if (!hasLower && !hasUpper) return null;

  const s = input.toLowerCase();
  if (s.length < 8 || s.length > 90) return null;
  const pos = s.lastIndexOf('1');
  if (pos < 1 || pos + 7 > s.length) return null; // needs 6 checksum chars

  const hrp = s.slice(0, pos);
  const dataPart = s.slice(pos + 1);
  const data: number[] = [];
  for (const ch of dataPart) {
    const v = BECH32_CHARKEY[ch];
    if (v === undefined) return null;
    data.push(v);
  }

  const spec = bech32VerifyChecksum(hrp, data);
  if (!spec) return null;

  return {
    hrp,
    spec,
    data: data.slice(0, -6), // drop checksum
  };
}

function convertBits(data: number[], from: number, to: number, pad: boolean) {
  let acc = 0;
  let bits = 0;
  const ret: number[] = [];
  const maxv = (1 << to) - 1;
  for (const value of data) {
    if (value < 0 || value >> from) return null;
    acc = (acc << from) | value;
    bits += from;
    while (bits >= to) {
      bits -= to;
      ret.push((acc >> bits) & maxv);
    }
  }
  if (pad) {
    if (bits) ret.push((acc << (to - bits)) & maxv);
  } else {
    if (bits >= from) return null;
    if (((acc << (to - bits)) & maxv) !== 0) return null;
  }
  return ret;
}

function isValidBech32SegwitAddress(addr: string) {
  const decoded = bech32Decode(addr);
  if (!decoded) return false;
  if (decoded.hrp !== 'bc') return false; // mainnet only
  if (decoded.data.length < 1) return false;

  const version = decoded.data[0] ?? -1;
  if (version < 0 || version > 16) return false;

  const program5 = decoded.data.slice(1);
  const program8 = convertBits(program5, 5, 8, false);
  if (!program8) return false;
  const programLength = program8.length;
  if (programLength < 2 || programLength > 40) return false;

  // BIP-173/BIP-350 rules.
  if (version === 0) {
    if (decoded.spec !== 'bech32') return false;
    if (programLength !== 20 && programLength !== 32) return false;
  } else {
    if (decoded.spec !== 'bech32m') return false;
    // v1 (taproot) is 32 bytes; allow other versions per spec.
  }

  return true;
}

/**
 * For HTML `pattern` usage (no flags supported). This pattern is permissive and
 * intended only for basic browser UX; server-side validation uses checksum for bc1.
 */
export const BITCOIN_ADDRESS_PATTERN =
  '(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34}|(?:bc1|BC1)[ac-hj-np-z02-9AC-HJ-NP-Z02-9]{11,71})';

export function isValidBitcoinOnchainAddress(input: string) {
  const addr = (input ?? '').trim();
  if (!addr) return false;
  if (addr.startsWith('bc1') || addr.startsWith('BC1')) return isValidBech32SegwitAddress(addr);
  if (addr.length < 26 || addr.length > 35) return false;
  if (!BASE58_RE.test(addr)) return false;
  for (const ch of addr) {
    if (!BASE58_CHARS.includes(ch)) return false;
  }
  return true;
}

