export const saveGratitude = (gratitudes, setGratitudes, text, id) => {
  let updatedGratitudes;
  const newGratitude = {
    id: id || Date.now(),
    date: new Date().toLocaleDateString(),
    text,
    type: 'gratitude'
  };

  if (id) {
    updatedGratitudes = gratitudes.map(gratitude =>
      gratitude.id === id ? { ...gratitude, text } : gratitude
    );
  } else {
    updatedGratitudes = [...gratitudes, newGratitude];
  }

  setGratitudes(updatedGratitudes);
  localStorage.setItem('gratitudes', JSON.stringify(updatedGratitudes));
};

export const editGratitude = (setCurrentGratitude, gratitude) => {
  setCurrentGratitude(gratitude);
};

export const deleteGratitude = (gratitudes, setGratitudes, id, moveToTrash) => {
  const deletedGratitude = gratitudes.find(gratitude => gratitude.id === id);
  moveToTrash(deletedGratitude); // Move to trash

  const updatedGratitudes = gratitudes.filter(gratitude => gratitude.id !== id);
  setGratitudes(updatedGratitudes);
  localStorage.setItem('gratitudes', JSON.stringify(updatedGratitudes));
};

export const clearCurrentGratitude = (setCurrentGratitude) => {
  setCurrentGratitude(null);
};
