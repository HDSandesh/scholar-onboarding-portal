const socketIo = require("socket.io");
const messageService = require("../services/messageService");
const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // Replace with client origin in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);
    console.log("👥 Total clients:", io.engine.clientsCount);

    // Join a chat room
    socket.on("joinChat", (chatId) => {
      if (!chatId) return;
      socket.join(chatId);
      console.log(`📥 ${socket.id} joined chat: ${chatId}`);
      io.to(chatId).emit('usersOnline', io.sockets.adapter.rooms?.get(chatId)?.size||0)
    });
    
    socket.on('usersOnline',(chatId)=>{
      io.to(chatId).emit('usersOnline', io.sockets.adapter.rooms?.get(chatId)?.size || 0)
    })

    // Handle sending message
    socket.on("sendMessage", async (messageData) => {
      try {
        const message = await messageService.sendMessage(messageData);

        // Emit to all users in the chat room
        io.to(message.chatId).emit("receiveMessage", message);
      } catch (error) {
        console.error("❌ Error sending message:", error);
        socket.emit("error", "Message delivery failed");
      }
    });

    // Typing indicators (broadcast to all in room except sender)
    socket.on("typing", ({ chatId, userId }) => {
      socket.broadcast.to(chatId).emit("typing", { userId });
    });

    socket.on("stopTyping", ({ chatId, userId }) => {
      socket.broadcast.to(chatId).emit("stopTyping", { userId });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
      io.emit('userLeft')
    });
  });

  return io;
};

module.exports = initializeSocket;
