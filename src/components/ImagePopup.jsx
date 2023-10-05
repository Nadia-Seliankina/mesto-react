import closeIcon from "../images/Close-Icon.svg";

export default function ImagePopup({ card, onClose }
) {
  // Исользуем JavaScript-шаблон для склейки значения атрибута
  const classNamePopup = `popup ${card ? "popup_opened" : ""}`;
  //const imageSrc = isOpen.src;
  //const imageAlt = isOpen.alt;
  //console.log(card);

  return (
  <section className={classNamePopup} id="popup-big-image">
      <div className="popup__container-big-image">
        <img className="popup__big-photo" src={card.src} alt={card.alt} />
        <h2 className="popup__title-big-image">{card.alt}</h2>
        <button
          name="popup-image-button-close"
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          id="popup-image-button-close"
          onClick={onClose}
        >
          <img className="popup__button-image" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </section>
  );
}