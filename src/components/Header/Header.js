import React from "react";
import styles from "components/Header/Header.module.scss";
import HeaderNavigation from "components/Header/HeaderNavigation";
import Logo from "components/Logo/Logo";
import Button from "components/Button/Button";

let desktopSize;

class Header extends React.Component {
    state = {
        isVisible: false,
        isDesktop: window.innerWidth >= desktopSize,
    }

    changeVisibility = () => {
        this.setState(prevState => ({ isVisible: !prevState.isVisible }));
    }

    handleResize = () => {
        this.setState({ isDesktop: window.innerWidth >= desktopSize });
    }

    componentDidMount() {
        desktopSize = parseInt(window.getComputedStyle(document.querySelector(`.${styles.desktopSize}`)).width, 10);
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    render() {
        const { isVisible, isDesktop } = this.state;

        return (
            <header className={styles.wrapper}>
                <div className={styles.desktopSize}></div>
                <div className={styles.logoNav}>
                    <Logo />
                    <Button onClick={this.changeVisibility}>&equiv;</Button>
                </div>
                { (isVisible || isDesktop) && <HeaderNavigation />}
            </header>
        );
    }
}

export default Header;
