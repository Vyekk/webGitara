import React from "react";
import styles from "components/Header/Header.module.scss";
import HeaderNavigation from "components/Header/HeaderNavigation";
import Logo from "components/Logo/Logo";
import Button from "components/Button/Button";

class Header extends React.Component {
    state = {
        isVisible: false,
    }
    changeVisibility = () => {
        if(this.state.isVisible == true) {
            this.setState({isVisible: false});
        } else {
            this.setState({isVisible: true});
        }
    }
    render() {
        return (
            <header className={styles.wrapper}>
                <div className={styles.logoNav}>
                    <Logo />
                    <Button onClick={this.changeVisibility}>&equiv;</Button>
                </div>
                <HeaderNavigation visible={this.state.isVisible} />
            </header>
        );
    }
}

export default Header;