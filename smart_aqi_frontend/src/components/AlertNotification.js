const AlertNotification = ({ message }) => {
  return (
    <div className="bg-orange-400 text-white px-6 py-3 rounded shadow-lg transition-all duration-500">
      {message}
    </div>
  );
};
export default AlertNotification;
