import React, { useEffect, useState } from "react";
import styles from "components/Header/Header.module.scss";
import HeaderNavigation from "components/Header/HeaderNavigation";
import Logo from "components/Logo/Logo";
import Button from "components/Button/Button";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      const desktopSize = parseInt(
        window.getComputedStyle(
          document.querySelector(`.${styles.desktopSize}`)
        ).width,
        10
      );
      setIsDesktop(window.innerWidth >= desktopSize);
    };

    updateIsDesktop();

    window.addEventListener("resize", updateIsDesktop);

    return () => {
      window.removeEventListener("resize", updateIsDesktop);
    };
  }, []);

  return (
    <header className={styles.wrapper}>
      <div className={styles.desktopSize}></div>
      <div className={styles.logoNav}>
        <Logo />
        <Button onClick={() => setIsVisible(!isVisible)}>&equiv;</Button>
      </div>
      {(isVisible || isDesktop) && <HeaderNavigation />}
    </header>
  );
};

export default Header;