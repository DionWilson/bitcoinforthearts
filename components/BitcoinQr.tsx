import QRCode from 'qrcode';

export default async function BitcoinQr({
  text,
  size = 192,
}: {
  text: string;
  size?: number;
}) {
  const src = await QRCode.toDataURL(text, {
    margin: 1,
    width: size,
    errorCorrectionLevel: 'M',
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Bitcoin donation QR code"
      width={size}
      height={size}
      className="rounded-lg border border-border bg-background"
    />
  );
}

