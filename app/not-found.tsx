import Link from "next/link";
import { SubPageShell } from "@/components/SubPageShell";

export default function NotFound() {
  return (
    <SubPageShell title="404">
      <p>no such file or directory.</p>
      <p>
        <Link href="/kev">head back to the poster</Link>, or try the{" "}
        <Link href="/terminal">terminal</Link> if you like poking around.
      </p>
    </SubPageShell>
  );
}
