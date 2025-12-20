import { BiErrorCircle } from "react-icons/bi";
import s from "./not-found.module.scss";

export default function Custom404() {
  return (
    <main className={s.container}>
      <BiErrorCircle className={s.icon} size={36} />
      <span>
        <code>404: Page Not Found</code>
      </span>
      <p>The page you are looking for does not exist.</p>
      <p>Please try again.</p>
    </main>
  );
}
