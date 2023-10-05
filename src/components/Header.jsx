import mestoImage from '../images/Mesto.svg';

export default function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={mestoImage} alt="Логотип" />
        </header>
    )
}