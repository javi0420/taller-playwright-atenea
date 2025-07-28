export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `user_${timestamp}@example.com`;
}