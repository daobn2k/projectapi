import { notification } from "antd";

export const NotificationCommon = (type, message, description, placement) => {
  if (type === "error") {
    return notification.error({
      message: message,
      description: description,
      placement: placement || "topRight",
    });
  }
  return notification.success({
    message: message,
    description: description,
    placement: placement || "topRight",
  });
};
