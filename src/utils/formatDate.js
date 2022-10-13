const showFormatMinute = (date) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return new Date(date).toLocaleTimeString('id-ID', options);
};

export default showFormatMinute;
