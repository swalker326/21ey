import Link from "next/link";
import Image from "next/image";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button } from "./buttons/Button";
import { useTheme } from "styled-components";

export const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  // const handleSignOutClick = () => {
  //   if (currentUser) {
  //     Auth.signOut();
  //   } else {
  //   }
  // };
  const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div>
        <LogoContainer>
          <Link href="/">
            <a>
              <Image src="/21eyLogo.svg" width={70} height={70} />
            </a>
          </Link>
        </LogoContainer>
        <ul>
          <li>
            <Link href={"/register"}>Register/Login</Link>
          </li>
          <li>
            <Link href="/profile">User</Link>
          </li>
        </ul>
        <div style={{ display: "flex" }}>
          {/* <Button onClick={handleSignOutClick}>
            {currentUser ? "Sign Out" : "Sign In"}
          </Button> */}
          <Button onClick={() => theme.handleColorModeChange()}>Dark</Button>
          {/* <Button onClick={handleDarkModeSwitch}>Dark</Button> */}
        </div>
      </div>
      {children}
    </div>
  );
};

const LogoContainer = styled.div`
  display: flex;
`;
