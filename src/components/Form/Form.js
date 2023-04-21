import React from "react";
import Title from "components/Title/Title";
import styles from "components/Form/Form.module.scss";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Radio from "components/Radio/Radio";

const types = {
    login: 'logowanie',
    register: 'rejestracja',
}

class Form extends React.Component {
    state = {
        activeOption: types.login,
    }

    changeOption = (type) => {
        this.setState({
            activeOption: type,
        });
    }

    render() {
        return (
            <>
                <Title>Zaloguj się</Title>
                <p>i kontynuuj praktykę</p>
                <form className={styles.form} onSubmit={this.props.submitFn}>
                    <div className={styles.radioWrapper}>
                        <Radio name="formType" value={types.login} checked={this.state.activeOption === types.login} onChange={() => this.changeOption(types.login)} />
                        <Radio name="formType" value={types.register} checked={this.state.activeOption === types.register} onChange={() => this.changeOption(types.register)} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input label="login" />
                        <Input label="haslo" />
                    </div>
                    <Button type="submit">Zaloguj</Button>
                </form>
            </>
        );
    }
}

export default Form;