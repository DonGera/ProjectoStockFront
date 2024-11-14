import Alert from "react-bootstrap/Alert";

const NotificationList = ({ messagesToShow, removeMessageFromList }) => {
  return (
    <>
      {messagesToShow.map((notification, idx) => {
        return (
          <Alert
            key={notification.id}
            variant={notification.variant}
            onClose={() => removeMessageFromList(notification.id)}
            dismissible
          >
            {notification.content}
          </Alert>
        );
      })}
    </>
  );
};

export default NotificationList;
