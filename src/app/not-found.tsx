// app/not-found.tsx
import { redirect } from 'next/navigation';

export default function NotFound() {
  // This will automatically perform a permanent redirect (308) to the homepage
  redirect('/');

  // You can return null or a simple loader, but the redirect will happen on the server
  // before the user sees anything.
  return null;
}
