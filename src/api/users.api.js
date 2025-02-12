export function getItemsFromStorage(key) {
  const usersList = JSON.parse(localStorage.getItem(key))
  return usersList
}

export function setItemsToStorage(key, usersList) {
  localStorage.setItem(key, JSON.stringify(usersList))
}