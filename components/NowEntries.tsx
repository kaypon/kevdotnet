import Link from "next/link";

/** The "what I'm up to" paragraphs, shared by /now and the hidden /focus
 * sheet. Edit here and both pages update. */
export function NowEntries() {
  return (
    <>
      <p>Currently:</p>
      <p>
        Running a paper trading experiment on Solana to find out if an AI model can actually
        pick trades, or if plain code does just as well. Four bots trade fake money on live
        prices: one runs on Jev, TypeSafe&apos;s judgment model, and the other three (a coin
        flip, a simple rule, and just holding SOL) are there to keep it honest. On 129 days of
        price history Jev turned $1,000 into $1,614, but the simple rule did better, so now
        it&apos;s getting tested live. Built with Next.js, the TypeSafe SDK, Jupiter for quotes,
        Helius and DexScreener for chain data, and SQLite to log every trade. There&apos;s a
        rug checker in there too: paste a token address, get the odds it&apos;s a scam. No real
        money until the numbers earn it. Not public yet, but I plan on posting it soon.
      </p>
      <p>
        Building small physics toys for the browser. Latest: <Link href="/cables">/cables</Link>,
        a bare utility pole you can drag around while the wires sag and settle.
      </p>
      <p>
        Also poking at <Link href="/projects/face-detect">/projects/face-detect</Link>, a
        browser-based face tracking playground, plus a two-hand color portal ripped straight
        from an Instagram trend.
      </p>
      <p>
        Wrote up a real case study on <Link href="/projects/phoebe">/projects/phoebe</Link>,
        the AI agent running on my old laptop: why it exists, how it&apos;s wired, and the token
        bottleneck that almost killed it.
      </p>
      <p>
        Building a 3PL software app for a logistics client. Warehouses, labels, and the boring
        parts that keep freight moving.
      </p>
      <p>
        Reading through bitchat, the open source Bluetooth mesh messenger, to see how it handles
        offline peer-to-peer messaging and encryption.
      </p>
      <p>Still hunting down a proper domain. And a hidden page or two remains. Keep an eye out.</p>
    </>
  );
}
