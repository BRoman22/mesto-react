import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import useApi from '../hooks/useApi';
import myToken from '../utils/myToken';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  //
  //
  //
  //
  //
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState(null);
  const {
    getUserInfo,
    setUserInfo,
    setAvatar,
    getCardList,
    toggleLike,
    addNewCard,
    deleteCard,
    getError,
  } = useApi(myToken);

  useEffect(() => {
    getUserInfo().then(setCurrentUser).catch(getError);
    getCardList().then(setCards).catch(getError);
  }, []);

  //submits
  const [buttonText, setButtonText] = useState({
    user: 'Сохранить',
    card: 'Создать',
    confirmation: 'Да',
  });
  const setIsLoading = (isLoading, buttonName) => {
    const text = buttonName != 'confirmation' ? 'Сохранение...' : 'Удаление...';
    const initialText = buttonText[buttonName];
    isLoading
      ? setButtonText({ ...buttonText, [buttonName]: text })
      : setButtonText({ ...buttonText, [buttonName]: initialText });
  };
  function handleSubmit(makeRequest, buttonName) {
    setIsLoading(true, buttonName);
    makeRequest()
      .then(closeAllPopups())
      .catch(getError)
      .finally(() => setIsLoading(false, buttonName));
  }
  function handleUpdateUser(data) {
    function makeRequest() {
      return setUserInfo(data).then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about });
      });
    }
    handleSubmit(makeRequest, 'user');
  }
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return setAvatar(data).then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
      });
    }
    handleSubmit(makeRequest, 'user');
  }
  function handleAddCard(data) {
    function makeRequest() {
      return addNewCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest, 'card');
  }
  function handleCardDelete() {
    function makeRequest() {
      return deleteCard(cardId).then(() => {
        setCards((cards) => cards.filter((card) => card._id != cardId));
      });
    }
    handleSubmit(makeRequest, 'confirmation');
  }

  function handleToggleCardLike(card, isLiked) {
    toggleLike(card._id, isLiked)
      .then((newCard) => setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c))))
      .catch(getError);
  }
  //открытие/закрытие попапов
  const [popup, setPopup] = useState({
    profile: false,
    card: false,
    avatar: false,
    confirmation: false,
    image: false,
    toolTipSuccess: false,
    toolTipFail: false,
  });
  function handleEditProfileClick() {
    setPopup({ ...popup, profile: true });
  }
  function handleAddPlaceClick() {
    setPopup({ ...popup, card: true });
  }
  function handleEditAvatarClick() {
    setPopup({ ...popup, avatar: true });
  }
  const [cardId, setCardId] = useState(null);
  function handleConfirmDeleteCardClick(id) {
    setPopup({ ...popup, confirmation: true });
    setCardId(id);
  }
  const [cardData, setCardData] = useState(null);
  function handleCardClick(name, link) {
    setPopup({ ...popup, image: true });
    setCardData({ name: name, link: link });
  }

  function closeAllPopups() {
    setPopup({
      profile: false,
      card: false,
      avatar: false,
      confirmation: false,
      image: false,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={cards}>
        <div className="page">
          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Header title={'Выйти'} link={'/signin'} email={'email@mail.com'} />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleToggleCardLike}
                      onCardDelete={handleConfirmDeleteCardClick}
                      cards={cards}
                    />
                    <Footer />
                    <EditProfilePopup
                      isOpen={popup.profile}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      buttonText={buttonText.user}
                    />
                    <AddPlacePopup
                      isOpen={popup.card}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddCard}
                      buttonText={buttonText.card}
                    />
                    <EditAvatarPopup
                      isOpen={popup.avatar}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      buttonText={buttonText.user}
                    />
                    <DeleteCardPopup
                      isOpen={popup.confirmation}
                      onClose={closeAllPopups}
                      onDeleteCard={handleCardDelete}
                      buttonText={buttonText.confirmation}
                    />
                    <ImagePopup isOpen={popup.image} onClose={closeAllPopups} card={cardData} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <Register />
                    <InfoTooltip
                      name={'success'}
                      title={'Вы успешно зарегистрировались!'}
                      isOpen={popup.toolTipSuccess}
                      onClose={closeAllPopups}
                    />
                    <InfoTooltip
                      name={'fail'}
                      title={'Что-то пошло не так!Попробуйте ещё раз.'}
                      isOpen={popup.toolTipFail}
                      onClose={closeAllPopups}
                    />
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <Login />
                    <InfoTooltip
                      name={'fail'}
                      title={'Что-то пошло не так!Попробуйте ещё раз.'}
                      isOpen={popup.toolTipFail}
                      onClose={closeAllPopups}
                    />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
