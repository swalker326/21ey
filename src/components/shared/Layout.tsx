import Link from "next/link";
import Image from "next/image";
import { Auth } from "aws-amplify";
import { useThemeContext } from "../../context/ThemeContext";
export const Layout: React.FC = ({ children }) => {
  const theme = useThemeContext();
  const handleDarkModeSwitch = () => {
    theme.setCurrentTheme(theme.mode === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <div>
        <Link href="/">
          <a>
            <Image src="/21eyLogo.svg" width={70} height={70} />
          </a>
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
        <button onClick={handleDarkModeSwitch}>Dark</button>
      </div>
      {children}
    </div>
  );
};
