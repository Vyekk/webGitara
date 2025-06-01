import styles from 'components/Logo/Logo.module.scss';
import { Link } from 'react-router-dom';
import logoImage from 'assets/webGitaraLogo.png';

const Logo = () => (
    <div className={styles.logo}>
        <Link to="/">
            <img src={logoImage} alt="webGitara" />
        </Link>
    </div>
);

export default Logo;
