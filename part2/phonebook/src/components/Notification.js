const Notification = ({ message, setMessage, typeMessage }) => {
  if (message === null) {
    return null;
  }
  setTimeout(() => {
    setMessage(null);
  }, 5000);

  return (
    <div className={typeMessage === "success" ? "success" : "error"}>
      {message}
    </div>
  );
};
export default Notification;
