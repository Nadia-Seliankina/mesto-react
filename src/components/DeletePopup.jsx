import PopupWithForm from "./PopupWithForm";
//import { useState } from "react";

export default function DeletePopup({ isOpen, onClose, onDelete }) {
  // Стейт, в котором содержится значение карточки
  //const [card, setCard] = useState("");

  //function handleSubmit(e) {
    //setCard(e.target);
    // Запрещаем браузеру переходить по адресу формы
    //e.preventDefault();
    // Передаём значения во внешний обработчик
    //const CardID = card._id
    //onDelete(CardID);
  //}

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      btnText="Да"
      isOpen={isOpen}
      onClose={onClose}
      //onSubmit={handleSubmit}
      //value={card}
      onSubmit={onDelete}
    />
  );
}
