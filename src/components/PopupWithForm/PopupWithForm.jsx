export default function PopupWithForm({ title, name, buttonText, isOpen, onClose, children }) {
  return (
    <div
      className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}
      onClick={onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <form name={name} className={`popup__form popup__form_${name}`}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
        <button aria-label="закрыть" type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
