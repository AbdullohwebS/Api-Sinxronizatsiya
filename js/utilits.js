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

export function localAddProduct(what, where) {
  const result = [...where, what];
  return result;
}

export function localRemoveProduct(id, where) {
  const result = where.filter((element) => element.id !== id);
  return result;
}

export function localUpdataProduct(what, where) {
  const result = where.map((element) => {
    if (what.id === element.id) {
      return what;
    } else {
      return element;
    }
  });
  return result;
}
