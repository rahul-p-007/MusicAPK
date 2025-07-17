import { Server } from "socket.io";

import { Message } from "../models/message.model.js";
// import { use } from "react"; // This import seems unused and can be removed

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSocket = new Map();
  const userActivity = new Map();

  io.on("connection", (socket) => {
    // Authenticate user on connection if needed, or rely on client sending userId
    // For simplicity, assuming userId is sent via 'user_connected' for now.

    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id);
      userActivity.set(userId, "idle");

      // Broadcast that a new user has connected
      io.emit("user_connected", userId);

      // Send the *full list* of online users to the newly connected client
      // IMPORTANT: Changed from "user_online" to "users_online" to match client
      socket.emit("users_online", Array.from(userSocket.keys()));

      // Send initial activities to the newly connected client
      io.emit("activities", Array.from(userActivity.entries()));
    });

    socket.on("update_activity", (userId, activity) => {
      userActivity.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    // IMPORTANT: Changed event name from "send_message" to "message_sent" to match client
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;
        console.log("🔻 Incoming message data:", data);

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        console.log("✅ Message saved to DB:", message);

        const receiverSocketId = userSocket.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.error("❌ Error in send_message:", error);
        socket.emit("message_error", error.message || "Unknown error");
      }
    });

    socket.on("disconnect", () => {
      let disconnectedId;
      for (const [userId, socketId] of userSocket.entries()) {
        if (socketId === socket.id) {
          disconnectedId = userId;
          userSocket.delete(userId);
          userActivity.delete(userId); // Remove user activity on disconnect
          break;
        }
      }
      if (disconnectedId) {
        io.emit("user_disconnected", disconnectedId);
      }
    });
  });
};
