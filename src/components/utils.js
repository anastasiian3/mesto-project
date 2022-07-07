// изменение надписи кнопки при изменении или внесении данных
function renderLoading(activeButton, isLoading) {
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
}

export { renderLoading };
