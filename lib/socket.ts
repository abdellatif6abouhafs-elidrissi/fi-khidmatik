import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: SocketIOServer | null = null;

export const initSocket = (server: HTTPServer) => {
  if (io) return io;

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join user room
    socket.on('join', (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Leave user room
    socket.on('leave', (userId: string) => {
      socket.leave(`user:${userId}`);
      console.log(`User ${userId} left their room`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Send notification to specific user
export const sendNotification = (userId: string, notification: any) => {
  try {
    const io = getIO();
    io.to(`user:${userId}`).emit('notification', notification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default { initSocket, getIO, sendNotification };
