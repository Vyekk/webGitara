import { useEffect, useState } from 'react';
import Section from 'components/Section/Section';
import Title from 'components/Title/Title';
import headerImage from 'assets/header_image.png';
import profitsImage from 'assets/profits.png';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import styles from 'views/WebsiteView/WebisteView.module.scss';
import Card from 'components/Card/Card';

const profits = ['Rozszerzaj swoje horyzony', 'Rozwijaj słuch muzyczny', 'Naucz się pozycji dźwięków'];

const WebsiteView = () => {
    const [profitNumber, setProfitNumber] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProfitNumber((prev) => nextProfit(prev));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const nextProfit = (currentProfitNumber: number) => {
        let activeProfit = currentProfitNumber + 1;
        if (activeProfit > profits.length - 1) {
            activeProfit = 0;
        }
        return activeProfit;
    };

    const prevProfit = (currentProfitNumber: number) => {
        let activeProfit = currentProfitNumber - 1;
        if (activeProfit <= -1) {
            activeProfit = profits.length - 1;
        }
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
                    Co zyskasz dzięki webGitarze?
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
                <div className={styles.demo}>
                    <iframe
                        src="https://www.youtube.com/embed/Xdc7u4MUYYo"
                        title="John5 Solo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>

                    <div className={styles.demoTextWrapper}>
                        <Title tag="h2" black center={false}>
                            Zobacz, jak działa webGitara w praktyce!
                        </Title>
                        <p className={styles.demoParagraph}>
                            Z przyjemnością prezentuję krótki film wideo, w którym pokazuję działanie naszej platformy
                            webGitara oraz jak się nią posługiwać. Film ten będzie doskonałym przewodnikiem dla osób,
                            które chcą poznać możliwości tej platformy i dowiedzieć się jak korzystać z jej różnych
                            funkcji. Mamy nadzieję, że film ten pomoże Państwu w pełni wykorzystać potencjał webGitary i
                            cieszyć się jej użytkowaniem.
                        </p>
                    </div>
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
                                <a href="tel:+48000000000">📞 +48 000 000 000</a>
                            </li>
                            <li>
                                <a href="mailto:kontakt@mail.com">✉ kontakt@mail.com</a>
                            </li>
                            <li>
                                <a href="#">🌐 webGitara</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Title tag="h2">Inne projekty</Title>
                        <ul>
                            <li>
                                <a href="https://www.przykladowa-strona.pl" target="_blank" rel="noopener noreferrer">
                                    🔗 www.przykladowa-strona.pl
                                </a>
                            </li>
                            <li>
                                <a href="https://www.przykladowa-strona.pl" target="_blank" rel="noopener noreferrer">
                                    🔗 www.przykladowa-strona.pl
                                </a>
                            </li>
                            <li>
                                <a href="https://www.przykladowa-strona.pl" target="_blank" rel="noopener noreferrer">
                                    🔗 www.przykladowa-strona.pl
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Section>
            <Footer />
        </div>
    );
};

export default WebsiteView;
