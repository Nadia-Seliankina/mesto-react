import likeImage from "../images/Vector.svg";
import deleteImage from "../images/Delete.svg";

export default function Card({ src, alt, title, likes, onCardClick, card}) {

  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <>
      <button
        className="element__image-button"
        name="image-button"
        type="button"
        aria-label="Открыть фото"
        onClick={handleClick}
      >
        <img className="element__image" src={src} alt={alt} />
      </button>
      <div className="element__group">
        <h2 className="element__title">{title}</h2>
        <div className="element__how-like">
          <button
            name="button-like"
            type="button"
            className="element__button"
            aria-label="Нравится"
          >
            <img className="element__like" src={likeImage} alt="Нравится" />
          </button>
          <h3 className="element__counter">{likes}</h3>
        </div>
      </div>
      <button
        name="button-delete"
        type="button"
        className="element__delete"
        aria-label="Удалить"
      >
        <img
          className="element__delete-image"
          src={deleteImage}
          alt="Удалить"
        />
      </button>
    </>
  );
}
