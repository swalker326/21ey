import Link from "next/link";
import Image from "next/image";
import { Auth } from "aws-amplify";
export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <Image src="/21eyLogo.svg" width={70} height={70} />
        </Link>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/register"}>Register/Login</Link>
          </li>
          <li>
            <Link href="/profile">User</Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};
