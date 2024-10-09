export function isIdParamValid(idParam: string) {
  const id = Number(idParam);
  if (isNaN(id) || id <= 0) throw {
    type: "bad_request",
    message: "Invalid id."
  }

  return id;
}