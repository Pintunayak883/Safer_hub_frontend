import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAlert, updateAlertStatus } from '../store/slices/alertSlice';
import { updateCommunityPulse } from '../store/slices/pulseSlice';

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
        transports: ['websocket'],
        upgrade: true,
        rememberUpgrade: true,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      // Handle whisper alerts
      newSocket.on('whisper-alert-received', (data) => {
        console.log('Whisper alert received:', data);
        dispatch(addNewAlert(data));
      });

      // Handle forum messages
      newSocket.on('new-forum-message', (data) => {
        console.log('New forum message:', data);
        // Handle forum message updates
      });

      // Handle pulse updates
      newSocket.on('pulse-updated', (data) => {
        console.log('Pulse updated:', data);
        dispatch(updateCommunityPulse(data));
      });

      // Handle alert status updates
      newSocket.on('alert-status-updated', (data) => {
        console.log('Alert status updated:', data);
        dispatch(updateAlertStatus(data));
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isAuthenticated, dispatch]);

  return { socket };
};

export default useSocket;
