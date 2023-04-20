import React from "react";
import Section from "components/Section/Section";
import Title from "components/Title/Title";
import headerImage from "assets/header_image.png";
import profitsImage from "assets/profits.png";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Button from "components/Button/Button";
import styles from "views/WebsiteView/WebisteView.module.scss";
import demo from "assets/demo.png";
import Card from "components/Card/Card";

const profits = ['Rozszerzaj swoje horyzony', 'Rozwijaj słuch muzyczny', 'Naucz się pozycji dźwięków'];

class WebsiteView extends React.Component {
  state = {
    profitNumber: 0,
  }
  nextProfit = () => {
    this.setState(prevState => {
      const activeProfit = prevState.profitNumber + 1;
      if (activeProfit < profits.length) {
        return { profitNumber: activeProfit };
      } else {
        return { profitNumber: 0 };
      }
    });
  };
  

  prevProfit = () => {
    this.setState(prevState => {
      const activeProfit = prevState.profitNumber - 1;
      if (activeProfit > -1) {
        return { profitNumber: activeProfit };
      } else {
        return { profitNumber: profits.length-1 };
      }
    });
  };

  render() {
    return (
      <>
          <Section url={headerImage}>
            <Header />
            <Title tag="h1">Naucz się grać <br /> na każdej <br /> gitarze</Title>
            <Title orange tag="h2">Wystarczy jedno kliknęcie</Title>
            <Button href="/login">Zacznij grać &gt;</Button>
          </Section>
          <Section id="about" dark>
            <Title tag="h2" center>O projekcie</Title>
            <p>WebGitara to innowacyjna aplikacja internetowa, która daje użytkownikom możliwość tworzenia i udostępniania swoich własnych utworów muzycznych z wykorzystaniem tabulatury i ich wizualizację na wirtualnym gryfie. Jest to doskonałe rozwiązanie dla osób, które chcą rozwijać swoje umiejętności gry na gitarze . O to korzyści jakie możesz wynieść korzystając z naszej platoformy:</p>
            <div className={styles.cardsWrapper}>
              <Card>
                <Title tag="h2" orange>Edukacja</Title>
                <ul>
                  <li>Użytkownicy mogą nauczyć się gry na gitarze</li>
                  <li>Możliwość udostępniania i oceniania utworów innych użytkowników pozwala na wymianę doświadczeń i inspirację</li>
                </ul>
              </Card>
              <Card>
                <Title tag="h2" orange>Kreatywność</Title>
                <ul>
                  <li>Możliwość tworzenia własnych utworów muzycznych pozwala na rozwijanie kreatywności i ekspresji</li>
                  <li>Możliwość czerpania inspiracja z szerokiej biblioteki gotowych utworów</li>
                </ul>
              </Card>
              <Card>
                <Title tag="h2" orange>Zabawa</Title>
                <ul>
                  <li>Gra na wirtualnej gitarze pozwala na czerpanie przyjemności z gry bez potrzeby posiadania instrumentu</li>
                  <li>Nie męcz swoich oczu ucząc się z tabulatury, tylko ciesz się z grania</li>
                </ul>
              </Card>
            </div>
          </Section>
          <Section id="demo">
            <Title tag="h2" black>Demo</Title>
            <div className={styles.demo}>
              <p className={styles.demoParagraph}>Z przyjemnością prezentuję krótki film wideo, w którym pokazuję działanie naszej platformy webGitara oraz jak się nią posługiwać. Film ten będzie doskonałym przewodnikiem dla osób, które chcą poznać możliwości tej platformy i dowiedzieć się jak korzystać z jej różnych funkcji. Mamy nadzieję, że film ten pomoże Państwu w pełni wykorzystać potencjał webGitary i cieszyć się jej użytkowaniem.</p>
              <img src={demo} alt="Demo działania aplikacji" />
            </div>
          </Section>
          <Section id="profits" url={profitsImage}>
            <div className={styles.profits}>
              <Button onClick={this.prevProfit}>&lt;</Button>
              <p>{profits[this.state.profitNumber]}</p>
              <Button onClick={this.nextProfit}>&gt;</Button>
            </div>
          </Section>
          <Section id="contact" dark>
            <div className={styles.contactWrapper}>
              <div>
                <Title tag="h2" white>Kontakt</Title>
                <ul>
                  <li><a href="">+48 000 000 000</a></li>
                  <li><a href="">kontakt@mail.com</a></li>
                  <li><a href="">webGitara</a></li>
                </ul>
              </div>
              <div>
                <Title tag="h2" white>Pozostałe informacje</Title>
                <ul>
                  <li><a href="">www.przykładowa-strona.pl</a></li>
                  <li><a href="">www.przykładowa-strona.pl</a></li>
                  <li><a href="">www.przykładowa-strona.pl</a></li>
                </ul>
              </div>
              <div style={{width: '40%', backgroundColor: '#fff', minHeight: '300px'}}></div>
            </div>
          </Section>
          <Footer />
      </>
  );
  }
}

export default WebsiteView;