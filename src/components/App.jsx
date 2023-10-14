import { useCallback, useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import ImagePopup from "./ImagePopup";
import avatarImage from "../images/avatar.jpg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  // Хук, управляющий состоянием попапа РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа НОВОЕ МЕСТО
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа ОБНОВИТЬ АВАТАР
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // Хук, управляющий состоянием попапа БОЛЬШОЙ КАРТИНКИ
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  // Хук, управляющий состоянием попапа УДАЛИТЬ
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Контекст, чтобы все компоненты приложения могли получить доступ к этим данным
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: avatarImage,
  });

  // Стейт для данных из API
  const [cards, setCards] = useState([]);

  // Статус загрузки
  //const [isLoading, setIsLoading] = useState(false);

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

  const handleCardLike = (card) => {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => {
      return i._id === currentUser._id;
    });

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (dataUser) => {
    api
      .editProfile(dataUser)
      .then((dataUser) => {
        console.log(dataUser);
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((dataUser) => {
        console.log(dataUser);
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
  };

  useEffect(() => {
    api
      .getAllInfo()
      .then(([dataUser, dataCards]) => {
        console.log([dataUser, dataCards]);
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddPlaceSubmit = (card) => {
    //setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
      //.finally(() => {
        //setIsLoading(true)});
  };

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  };

  const handleSubmitDelete = useCallback(
    function (e) {
      e.preventDefault();
      api
      .removeCard(selectedCard._id)
      .then((res) => {
        setCards((state) => {
          return state.filter((item) => {
            return item._id !== selectedCard._id;
          });
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
    }, [selectedCard]
  )
  
  //const handleCardDelete = (card) => {
    //api
      //.removeCard(card._id)
      //.then((res) => {
        //setCards((state) => {
          //return state.filter((item) => {
            //return item._id !== card._id;
          //});
        //});
      //})
      //.catch((err) => console.log(err));
  //};

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
          //onDeletePopup={handleDeleteClick}
          //onCardDelete={handleDeleteClick}
        />
        <Footer />
        {/* Pop-up Редактировать профиль */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* Pop-up Обновить аватар */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* Pop-up Новое место */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* Pop-up Вы уверены? */}
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleSubmitDelete}
        />
        {/* Pop-up big image*/}
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
