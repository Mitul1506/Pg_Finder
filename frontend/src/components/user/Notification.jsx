import React, { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notifications");
      setNotifications(res.data.data);
    } catch (error) {
      console.log("Error fetching notifications", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ marginBottom: "20px" }}>Notifications</h2>

      {notifications.length === 0 ? (
        <p style={{ color: "gray" }}>No notifications available</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "12px",
              backgroundColor: "#f9f9f9"
            }}
          >

            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {notification.title}
            </p>

            <p style={{ margin: "0" }}>
              {notification.body}
            </p>

            <small style={{ color: "gray" }}>
              {notification.createdAt
                ? new Date(notification.createdAt).toLocaleString()
                : ""}
            </small>

          </div>
        ))
      )}

    </div>
  );
};

export default Notification;