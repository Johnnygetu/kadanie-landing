export function getTelegramUrl(telegram?: string, phoneNumber?: string): string {
  if (telegram && telegram.trim()) {
    const clean = telegram.trim().replace(/^@/, '');
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      return clean;
    }
    return `https://t.me/${clean}`;
  }
  if (phoneNumber && phoneNumber.trim()) {
    const cleanDigits = phoneNumber.replace(/[^\d+]/g, '');
    const formatted = cleanDigits.startsWith('+') ? cleanDigits : `+${cleanDigits}`;
    return `https://t.me/${formatted}`;
  }
  return 'https://t.me/';
}
