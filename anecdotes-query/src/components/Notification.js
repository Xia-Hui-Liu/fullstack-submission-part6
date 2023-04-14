
const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };
  
  return (
    <div style={style}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
