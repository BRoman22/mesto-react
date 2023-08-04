function App() {
  return (
    <>
      <div className="page">
        <div className="page__content">
          <header class="header">
            <div class="header__logo"></div>
          </header>

          <main class="main">
            <section class="profile">
              <img src="" alt="" class="profile__avatar"></img>
              <button
                aria-label="редактировать"
                type="button"
                class="profile__button-edit-avatar"
              ></button>
              <div class="profile__info">
                <h1 class="profile__title"></h1>
                <button
                  aria-label="редактировать"
                  type="button"
                  class="profile__button-edit"
                ></button>
                <p class="profile__subtitle"></p>
              </div>
              <button
                aria-label="добавить карточку"
                type="button"
                class="profile__button-add"
              ></button>
            </section>
            <section aria-label="карточки" class="cards">
              <div class="cards__list"></div>
            </section>
          </main>

          <footer class="footer">
            <p class="footer__copyright">&copy; 2023 Mesto Russia</p>
          </footer>

          <div class="popup popup_profile">
            <div class="popup__container">
              <form name="profile" class="popup__form popup__form_profile" novalidate>
                <h2 class="popup__title">Редактировать профиль</h2>
                <input
                  placeholder="Введите имя"
                  name="name"
                  type="text"
                  class="popup__input popup__input_name"
                  id="profile-name-input"
                  minlength="2"
                  maxlength="40"
                  required
                ></input>
                <span class="popup__error profile-name-input-error"></span>
                <input
                  placeholder="О себе"
                  name="about"
                  type="text"
                  class="popup__input popup__input_about"
                  id="about-input"
                  minlength="2"
                  maxlength="200"
                  required
                ></input>
                <span class="popup__error about-input-error"></span>
                <button type="submit" class="popup__button">
                  Сохранить
                </button>
              </form>
              <button aria-label="закрыть" type="button" class="popup__close"></button>
            </div>
          </div>

          <div class="popup popup_card">
            <div class="popup__container">
              <form name="card" class="popup__form popup__form_card" novalidate>
                <h2 class="popup__title">Новое место</h2>
                <input
                  placeholder="Название"
                  name="name"
                  type="text"
                  class="popup__input popup__input_name"
                  id="card-name-input"
                  minlength="2"
                  maxlength="30"
                  required
                ></input>
                <span class="popup__error card-name-input-error"></span>
                <input
                  placeholder="Ссылка на картинку"
                  name="link"
                  type="url"
                  class="popup__input popup__input_link"
                  id="link-input"
                  required
                ></input>
                <span class="popup__error link-input-error"></span>
                <button type="submit" class="popup__button">
                  Создать
                </button>
              </form>
              <button aria-label="закрыть" type="button" class="popup__close"></button>
            </div>
          </div>

          <div class="popup popup_picture">
            <div class="popup__container popup__container_picture">
              <img src="" alt="изображение" class="popup__image"></img>
              <h2 class="popup__title popup__title_picture">подпись</h2>
              <button aria-label="закрыть" type="button" class="popup__close"></button>
            </div>
          </div>

          <div class="popup popup_confirmation">
            <div class="popup__container popup__container_confirmation">
              <form name="confirmation" class="popup__form popup__form_confirmation" novalidate>
                <h2 class="popup__title popup__title_confirmation">Вы уверены?</h2>
                <button type="submit" class="popup__button popup__button_confirmation">
                  Да
                </button>
              </form>
              <button aria-label="закрыть" type="button" class="popup__close"></button>
            </div>
          </div>

          <div class="popup popup_avatar">
            <div class="popup__container popup__container_avatar">
              <form name="avatar" class="popup__form popup__form_avatar" novalidate>
                <h2 class="popup__title popup__title_avatar">Обновить аватар</h2>
                <input
                  placeholder="Ссылка на картинку"
                  name="avatar"
                  type="url"
                  class="popup__input popup__input_link"
                  id="avatar-input"
                  required
                ></input>
                <span class="popup__error avatar-input-error"></span>
                <button type="submit" class="popup__button popup__button_avatar">
                  Сохранить
                </button>
              </form>
              <button aria-label="закрыть" type="button" class="popup__close"></button>
            </div>
          </div>

          <template id="card">
            <article class="card">
              <img src="" alt="изображение" class="card__image"></img>
              <div class="card__wrapper">
                <h2 class="card__title"></h2>
                <div class="card__wrap">
                  <button aria-label="нравится" type="button" class="card__like"></button>
                  <span class="card__counter"></span>
                </div>
              </div>
              <button aria-label="удалить" type="button" class="card__delete"></button>
            </article>
          </template>
        </div>
      </div>
    </>
  );
}

export default App;
