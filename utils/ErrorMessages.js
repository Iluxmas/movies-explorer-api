const SERVER = {
  NOT_EXIST: 'Страницы по данному адресу не существует',
  INTERNAL: 'Internal Server Error (Внутренняя ошибка сервера)',
};

const USER = {
  AUTH_REQUIRED: 'Необходима авторизация',
  INCORRECT_ID: 'Пользователя с указанным id не найдено',
  AUTH_WRONG: 'Неправильные почта или пароль',
};

const MOVIE = {
  INCORRECT_ID: 'Передан несуществующий id фильма',
  DELETEION_DENIED: 'Только владелец может удалять свои фильмы',
  SUCC_DELETE: 'Фильм был удален',
};

const VALIDATION = {
  INCORRECT_DATA: 'Переданы некорректные данные',
  EMAIL_EXISTS: 'Пользователь с такой почтой уже зарегестрирован',
};

module.exports = {
  SERVER, USER, MOVIE, VALIDATION,
};
