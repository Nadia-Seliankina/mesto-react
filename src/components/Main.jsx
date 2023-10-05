import { useEffect, useState } from "react";
import avatarImage from "../images/avatar.jpg";
import editImage from "../images/Edit.svg";
import plusImage from "../images/Plus.svg";
import api from "../utils/api";
import Card from "./Card";

const mapCards = (cards) => {
  return cards.map((item) => ({
    id: item._id,
    src: item.link,
    alt: item.name,
    title: item.name,
    likes: item.likes.length,
  }));
};

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  // Стейт для данных из API
  const [userName, setUserName] = useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = useState(
    "Исследователь океана"
  );
  const [userAvatar, setUserAvatar] = useState({ avatarImage });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getAllInfo()
      .then(([dataUser, dataCards]) => {
        console.log([dataUser, dataCards]);
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setCards(mapCards(dataCards));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile">
          <button
            className="profile__avatar-button"
            name="avatar-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditAvatar}
          >
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${userAvatar})` }}
            ></div>
          </button>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit-button"
                name="edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              >
                <img
                  className="profile__edit-button-image"
                  src={editImage}
                  alt="Редактировать"
                />
              </button>
            </div>
            <p className="profile__activity">{userDescription}</p>
          </div>
          <button
            className="profile__add-button"
            name="add-button"
            type="button"
            aria-label="Добавить"
            onClick={onAddPlace}
          >
            <img
              className="profile__add-button-image"
              src={plusImage}
              alt="Добавить"
            />
          </button>
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((cardData) => (
              <Card
                key={cardData.id}
                src={cardData.src}
                alt={cardData.alt}
                title={cardData.title}
                likes={cardData.likes}
                onCardClick={onCardClick}
                card={cardData}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
