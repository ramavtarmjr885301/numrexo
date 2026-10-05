import { emailConfigured, emailStatus } from '@/lib/emailSend';
import { listBroadcasts, quotaLeft } from '@/lib/emailBroadcastDb';
import { countSubscribers } from '@/lib/subscribersDb';
import { PageHeader } from '@/components/admin/AdminUi';
import EmailCenter from '@/components/admin/EmailCenter';

export const dynamic = 'force-dynamic';

export default async function EmailPage() {
  const [counts, quota, history] = await Promise.all([countSubscribers(), quotaLeft(), listBroadcasts(15)]);
  return (
    <div>
      <PageHeader title="Email center" subtitle="Check your email setup, send a test, and email your subscribers." />
      <EmailCenter
        configured={emailConfigured()}
        status={emailStatus()}
        activeSubscribers={counts.active}
        quota={quota}
        history={history}
      />
    </div>
  );
}
