import type { Metadata } from "next";
import Link from "next/link";
import UnsubscribeClient from "./UnsubscribeClient";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({ searchParams }: { searchParams: { t?: string } }) {
  const token = typeof searchParams.t === "string" ? searchParams.t : "";
  const valid = /^[a-f0-9]{32}$/.test(token);

  return (
    <div className="px-6 py-16">
      <div className="max-w-lg mx-auto bg-surface border border-hairline rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-ink mb-3">Unsubscribe from Numrexo emails</h1>
        {valid ? (
          <>
            <p className="text-ink-soft mb-6">Click the button to stop receiving update emails from Numrexo.</p>
            <UnsubscribeClient token={token} />
          </>
        ) : (
          <p className="text-ink-soft">
            This unsubscribe link looks incomplete. Please use the link from the bottom of the email, or{" "}
            <Link href="/contact" className="text-blue-600 underline">
              contact us
            </Link>{" "}
            and we&apos;ll remove your address.
          </p>
        )}
      </div>
    </div>
  );
}
