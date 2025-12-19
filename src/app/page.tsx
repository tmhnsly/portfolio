import { Button } from "@/components/Button/ Button";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.page}>
      <section className={s.heroSection}>
        <h1>hero</h1>
        <Button>Click me</Button>
      </section>
      <section>
        <h1>code</h1>
      </section>
      <section>
        <h1>video</h1>
      </section>
    </main>
  );
}
