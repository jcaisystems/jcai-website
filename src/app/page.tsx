import { headers } from 'next/headers';
import EnhancedHomepageClient from './EnhancedHomepageClient';

export default async function Page() {
  // Await headers() to get the headers object
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  return <EnhancedHomepageClient isMobile={isMobile} />;
}
