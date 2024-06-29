import { useState } from 'react';
import Section from 'components/Section/Section';
import Title from 'components/Title/Title';
import headerImage from 'assets/header_image.png';
import profitsImage from 'assets/profits.png';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import styles from 'views/WebsiteView/WebisteView.module.scss';
import demo from 'assets/demo.png';
import Card from 'components/Card/Card';

const profits = ['Rozszerzaj swoje horyzony', 'Rozwijaj słuch muzyczny', 'Naucz się pozycji dźwięków'];

const WebsiteView = () => {
    const [profitNumber, setProfitNumber] = useState(0);

    const nextProfit = (currentProfitNumber: number) => {
        let activeProfit = currentProfitNumber + 1;
        if (activeProfit > profits.length - 1) {
            activeProfit = 0;
        }
        console.log(activeProfit);
        return activeProfit;
    };

    const prevProfit = (currentProfitNumber: number) => {
        let activeProfit = currentProfitNumber - 1;
        if (activeProfit <= -1) {
            activeProfit = profits.length - 1;
        }
        console.log(activeProfit);
        return activeProfit;
    };

    return (
        <div className={styles.websiteViewWrapper}>
            <Section url={headerImage}>
                <Header />
                <Title tag="h1">
                    Naucz się grać <br /> na każdej <br /> gitarze
                </Title>
                <Title orange tag="h2">
                    Wystarczy jedno kliknęcie
                </Title>
                <Button className={styles.startButton} href="/login">
                    Zacznij grać &gt;
                </Button>
            </Section>
            <Section id="about" dark>
                <Title tag="h2" center>
                    O projekcie
                </Title>
                <p className={styles.aboutParagraph}>
                    WebGitara to innowacyjna aplikacja internetowa, która daje użytkownikom możliwość tworzenia i
                    udostępniania swoich własnych utworów muzycznych z wykorzystaniem tabulatury i ich wizualizację na
                    wirtualnym gryfie. Jest to doskonałe rozwiązanie dla osób, które chcą rozwijać swoje umiejętności
                    gry na gitarze . O to korzyści jakie możesz wynieść korzystając z naszej platoformy:
                </p>
                <div className={styles.cardsWrapper}>
                    <Card title="Edukacja">
                        <li>Użytkownicy mogą nauczyć się gry na gitarze</li>
                        <li>
                            Możliwość udostępniania i oceniania utworów innych użytkowników pozwala na wymianę
                            doświadczeń i inspirację
                        </li>
                    </Card>
                    <Card title="Kreatywność">
                        <li>
                            Możliwość tworzenia własnych utworów muzycznych pozwala na rozwijanie kreatywności i
                            ekspresji
                        </li>
                        <li>Możliwość czerpania inspiracja z szerokiej biblioteki gotowych utworów</li>
                    </Card>
                    <Card title="Zabawa">
                        <li>
                            Gra na wirtualnej gitarze pozwala na czerpanie przyjemności z gry bez potrzeby posiadania
                            instrumentu
                        </li>
                        <li>Nie męcz swoich oczu ucząc się z tabulatury, tylko ciesz się z grania</li>
                    </Card>
                </div>
            </Section>
            <Section id="demo">
                <Title tag="h2" black>
                    Demo
                </Title>
                <div className={styles.demo}>
                    <p className={styles.demoParagraph}>
                        Z przyjemnością prezentuję krótki film wideo, w którym pokazuję działanie naszej platformy
                        webGitara oraz jak się nią posługiwać. Film ten będzie doskonałym przewodnikiem dla osób, które
                        chcą poznać możliwości tej platformy i dowiedzieć się jak korzystać z jej różnych funkcji. Mamy
                        nadzieję, że film ten pomoże Państwu w pełni wykorzystać potencjał webGitary i cieszyć się jej
                        użytkowaniem.
                    </p>
                    <img src={demo} alt="Demo działania aplikacji" />
                </div>
            </Section>
            <Section id="profits" url={profitsImage}>
                <div className={styles.profits}>
                    <Button onClick={() => setProfitNumber(prevProfit(profitNumber))}>&lt;</Button>
                    <p>{profits[profitNumber]}</p>
                    <Button onClick={() => setProfitNumber(nextProfit(profitNumber))}>&gt;</Button>
                </div>
            </Section>
            <Section id="contact" dark>
                <div className={styles.contactWrapper}>
                    <div>
                        <Title tag="h2">Kontakt</Title>
                        <ul>
                            <li>
                                <a href="">+48 000 000 000</a>
                            </li>
                            <li>
                                <a href="">kontakt@mail.com</a>
                            </li>
                            <li>
                                <a href="">webGitara</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Title tag="h2">Pozostałe informacje</Title>
                        <ul>
                            <li>
                                <a href="">www.przykładowa-strona.pl</a>
                            </li>
                            <li>
                                <a href="">www.przykładowa-strona.pl</a>
                            </li>
                            <li>
                                <a href="">www.przykładowa-strona.pl</a>
                            </li>
                        </ul>
                    </div>
                    <div style={{ width: '40%', backgroundColor: '#fff', minHeight: '300px' }}></div>
                </div>
            </Section>
            <Footer />
        </div>
    );
};

export default WebsiteView;
