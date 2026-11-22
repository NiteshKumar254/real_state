/**
 * Currency and string formatters
 */

export function formatPrice(num) {
  if (!num) return 'Price on Request';
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2);
    return `₹ ${cr.replace(/\.00$/, '')} Cr`;
  }
  if (num >= 100000) {
    const lk = (num / 100000).toFixed(2);
    return `₹ ${lk.replace(/\.00$/, '')} L`;
  }
  return `₹ ${num.toLocaleString('en-IN')}`;
}

export function formatPhone(phone) {
  if (!phone) return '';
  return phone;
}

export function truncate(text, length = 120) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
