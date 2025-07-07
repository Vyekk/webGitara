import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import styles from './TermsAndPrivacyView.module.scss';
import Section from 'components/Section/Section';

const TermsAndPrivacyView = () => {
    return (
        <>
            <Section dark>
                <Header />
                <div className={styles.termsOfUseContent}>
                    <h1>Regulamin korzystania z aplikacji muzycznej webGitara</h1>

                    <section>
                        <h2>1. Postanowienia ogólne</h2>
                        <p>
                            1.1. Niniejszy regulamin określa zasady korzystania z aplikacji muzycznej webGitara (dalej:
                            &quot;Aplikacja&quot;), która umożliwia tworzenie, odtwarzanie, przechowywanie oraz
                            udostępnianie utworów muzycznych przez użytkowników.
                        </p>
                        <p>1.2. Korzystanie z Aplikacji oznacza akceptację niniejszego regulaminu.</p>
                    </section>

                    <section>
                        <h2>2. Tworzenie treści przez użytkownika</h2>
                        <p>
                            2.1. Aplikacja umożliwia tworzenie własnych utworów muzycznych (dalej: &quot;Treści&quot;) z
                            wykorzystaniem wbudowanego edytora (np. edytor tabulatur, nut, MIDI).
                        </p>
                        <p>
                            2.2. Użytkownik oświadcza, że posiada wszelkie prawa autorskie do Treści, które tworzy i
                            zapisuje w Aplikacji.
                        </p>
                        <p>
                            2.3. Zabrania się tworzenia, przesyłania, zapisywania lub udostępniania Treści naruszających
                            prawa autorskie osób trzecich (np. kopiowanie znanych piosenek bez licencji).
                        </p>
                        <p>
                            2.4. Użytkownik ponosi pełną odpowiedzialność za zgodność tworzonych Treści z przepisami
                            dotyczącymi prawa autorskiego.
                        </p>
                    </section>

                    <section>
                        <h2>3. Udostępnianie treści i licencjonowanie</h2>
                        <p>
                            3.1. Użytkownik, tworząc i zapisując Treści w Aplikacji, udziela nieodpłatnej, niewyłącznej,
                            ogólnodostępnej licencji na korzystanie z tych Treści przez innych użytkowników Aplikacji.
                        </p>
                        <p>
                            3.2. Licencja, o której mowa w pkt 3.1, obejmuje prawo do: odtwarzania, modyfikacji,
                            pobierania oraz dalszego wykorzystywania Treści w celach niekomercyjnych.
                        </p>
                        <p>
                            3.3. Udostępnianie Treści innym użytkownikom jest domyślnie włączone. Użytkownik ma
                            możliwość oznaczenia utworu jako prywatnego.
                        </p>
                        <p>
                            3.4. Aplikacja nie umożliwia wgrywania ani rozpowszechniania gotowych plików muzycznych (np.
                            MP3, GuitarPro, MIDI) pochodzących z nieautoryzowanych źródeł.
                        </p>
                    </section>

                    <section>
                        <h2>4. Zgłaszanie naruszeń</h2>
                        <p>
                            4.1. Każdy użytkownik ma możliwość zgłoszenia Treści, które naruszają prawa autorskie lub
                            inne przepisy prawa.
                        </p>
                        <p>
                            4.2. Administrator zastrzega sobie prawo do usunięcia Treści naruszających regulamin oraz
                            zablokowania konta użytkownika.
                        </p>
                        <p>
                            4.3. Aplikacja stosuje procedurę DMCA (Digital Millennium Copyright Act) w zakresie
                            reagowania na zgłoszenia naruszeń.
                        </p>
                    </section>

                    <section>
                        <h2>5. Odpowiedzialność użytkownika</h2>
                        <p>
                            5.1. Użytkownik ponosi pełną odpowiedzialność za Treści, które tworzy, zapisuje i udostępnia
                            za pośrednictwem Aplikacji.
                        </p>
                        <p>
                            5.2. Administrator nie ponosi odpowiedzialności za naruszenia prawa dokonane przez
                            użytkowników.
                        </p>
                        <p>
                            5.3. Administrator zastrzega sobie prawo do usuwania Treści naruszających regulamin,
                            przepisy prawa lub prawa osób trzecich.
                        </p>
                    </section>

                    <section>
                        <h2>6. Postanowienia końcowe</h2>
                        <p>6.1. Administrator zastrzega sobie prawo do zmiany niniejszego regulaminu.</p>
                        <p>
                            6.2. Wszelkie pytania i zgłoszenia należy kierować na adres kontaktowy wskazany w Aplikacji.
                        </p>
                    </section>

                    <section>
                        <h2>Polityka prywatności aplikacji webGitara</h2>
                        <p>
                            <strong>1. Administrator danych osobowych</strong>
                            <br />
                            Administratorem danych osobowych użytkowników aplikacji webGitara (dalej: „Aplikacja”) jest
                            [Twoja firma / Imię i nazwisko], z siedzibą w [adres], kontakt: [adres e-mail].
                        </p>
                        <p>
                            <strong>2. Zakres zbieranych danych</strong>
                            <br />W ramach korzystania z Aplikacji możemy zbierać następujące dane:
                            <ul>
                                <li>adres e-mail,</li>
                                <li>nazwa użytkownika,</li>
                                <li>hasło (zaszyfrowane),</li>
                                <li>historia utworów, komentarze, oceny, zapisane dane tabulatur,</li>
                                <li>
                                    adres IP, dane przeglądarki i systemu operacyjnego (do celów bezpieczeństwa i
                                    statystyki).
                                </li>
                            </ul>
                        </p>
                        <p>
                            <strong>3. Cele przetwarzania danych</strong>
                            <br />
                            Dane są przetwarzane w następujących celach:
                            <ul>
                                <li>założenie i obsługa konta użytkownika,</li>
                                <li>umożliwienie tworzenia i publikacji treści muzycznych,</li>
                                <li>zapewnienie prawidłowego działania aplikacji,</li>
                                <li>reagowanie na naruszenia regulaminu i zgłoszenia prawne,</li>
                                <li>prowadzenie statystyk technicznych (np. liczba odwiedzin, błędy).</li>
                            </ul>
                        </p>
                        <p>
                            <strong>4. Podstawy prawne przetwarzania</strong>
                            <br />
                            Dane przetwarzamy na podstawie:
                            <ul>
                                <li>zgody użytkownika (art. 6 ust. 1 lit. a RODO),</li>
                                <li>
                                    konieczności realizacji umowy o świadczenie usług drogą elektroniczną (art. 6 ust. 1
                                    lit. b RODO),
                                </li>
                                <li>
                                    uzasadnionego interesu administratora (np. ochrona przed nadużyciami – art. 6 ust. 1
                                    lit. f RODO).
                                </li>
                            </ul>
                        </p>
                        <p>
                            <strong>5. Udostępnianie danych</strong>
                            <br />
                            Dane użytkownika nie są sprzedawane ani udostępniane osobom trzecim, za wyjątkiem sytuacji
                            przewidzianych przepisami prawa (np. na żądanie organów ścigania).
                        </p>
                        <p>
                            <strong>6. Prawa użytkownika</strong>
                            <br />
                            Użytkownik ma prawo do:
                            <ul>
                                <li>dostępu do swoich danych,</li>
                                <li>ich sprostowania,</li>
                                <li>usunięcia („prawo do bycia zapomnianym”),</li>
                                <li>ograniczenia przetwarzania,</li>
                                <li>przenoszenia danych,</li>
                                <li>wniesienia sprzeciwu,</li>
                                <li>
                                    cofnięcia zgody w dowolnym momencie (jeśli przetwarzanie było oparte na zgodzie).
                                </li>
                            </ul>
                        </p>
                        <p>
                            <strong>7. Przechowywanie danych</strong>
                            <br />
                            Dane będą przechowywane przez okres istnienia konta użytkownika oraz przez 6 miesięcy po
                            jego usunięciu w celach archiwalnych i bezpieczeństwa.
                        </p>
                        <p>
                            <strong>8. Pliki cookies</strong>
                            <br />
                            Aplikacja może wykorzystywać pliki cookies w celu:
                            <ul>
                                <li>utrzymania sesji użytkownika po zalogowaniu,</li>
                                <li>analizy statystycznej ruchu na stronie,</li>
                                <li>zapamiętywania ustawień użytkownika.</li>
                            </ul>
                            Użytkownik może zarządzać cookies za pomocą ustawień swojej przeglądarki.
                        </p>
                        <p>
                            <strong>9. Zabezpieczenia</strong>
                            <br />
                            Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić dane osobowe przed
                            nieautoryzowanym dostępem, utratą, zniszczeniem lub modyfikacją (np. szyfrowanie haseł,
                            bezpieczne połączenie HTTPS).
                        </p>
                        <p>
                            <strong>10. Kontakt w sprawie prywatności</strong>
                            <br />W przypadku pytań dotyczących polityki prywatności lub przetwarzania danych prosimy o
                            kontakt: [adres e-mail].
                        </p>
                    </section>
                </div>
            </Section>
            <Footer />
        </>
    );
};

export default TermsAndPrivacyView;
