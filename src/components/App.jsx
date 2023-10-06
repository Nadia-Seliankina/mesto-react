import { useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  // Хук, управляющий внутренним состоянием попапа РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // Хук, управляющий внутренним состоянием попапа НОВОЕ МЕСТО
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // Хук, управляющий внутренним состоянием попапа ОБНОВИТЬ АВАТАР
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // Хук, управляющий внутренним состоянием попапа БОЛЬШОЙ КАРТИНКИ
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/* Pop-up Редактировать профиль */}
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        btnText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {/* Получения данных о имени */}
        <input
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__input"
          id="inputName"
          required
          minLength="2"
          maxLength="40"
        />
        <span
          id="name-user-error"
          name="name-error"
          className="popup__error popup__error_num_1"
        ></span>
        {/* Получения данных о деятельности */}
        <input
          type="text"
          name="about"
          placeholder="Вид деятельности"
          className="popup__input"
          id="inputActivity"
          required
          minLength="2"
          maxLength="200"
        />
        <span
          id="about-error"
          name="about-error"
          className="popup__error popup__error_num_2"
        ></span>
      </PopupWithForm>
      {/* Pop-up Обновить аватар */}
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        btnText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        {/* Получения данных о ссылке на аватар */}
        <input
          type="url"
          name="link"
          placeholder="Ссылка на аватар"
          className="popup__input"
          id="link-avatar"
          required
        />
        <span
          id="link-error-avatar"
          name="link-error"
          className="popup__error popup__error_num_2"
        ></span>
      </PopupWithForm>
      {/* Pop-up Новое место */}
      <PopupWithForm
        name="add"
        title="Новое место"
        btnText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        {/* Получения данных о названии места */}
        <input
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input"
          id="name"
          required
          minLength="2"
          maxLength="30"
        />
        <span
          id="name-error"
          name="name-error"
          className="popup__error popup__error_num_1"
        ></span>
        {/* Получения данных о ссылке на фото */}
        <input
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input"
          id="link"
          required
        />
        <span
          id="link-error"
          name="link-error"
          className="popup__error popup__error_num_2"
        ></span>
      </PopupWithForm>
      {/* Pop-up Вы уверены? */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        btnText="Да"
        isOpen={false}
        onClose={closeAllPopups}
      ></PopupWithForm>
      {/* Pop-up big image*/}
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
