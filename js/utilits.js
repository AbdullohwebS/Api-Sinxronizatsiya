export function validator(obj) {
  if (obj.username.trim() === "") {
    return {
      target: "username",
      message: "Foydalanovchi ismini bo'sh qoldirish mumkin emas!",
    };
  }

  if (obj.password.trim() === "") {
    return {
      target: "password",
      message: "Foydalanovchi paroli bo'sh qoldirish mumkin emas!",
    };
  }
  return false;
}
