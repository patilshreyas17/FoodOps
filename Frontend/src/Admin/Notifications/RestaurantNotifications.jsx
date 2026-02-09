import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Chip,
  Container,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  MarkEmailRead,
  Refresh,
  FilterList,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../config/api';

const RestaurantNotifications = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, read, unread

  // Check if restaurant is approved
  const isRestaurantApproved = restaurant.usersRestaurant?.approvalStatus === "APPROVED";

  useEffect(() => {
    if (isRestaurantApproved) {
      fetchNotifications();
    }
  }, [isRestaurantApproved]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/notifications/restaurant', {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      setNotifications(response.data || []);
    } catch (err) {
      setError('Failed to fetch notifications: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/api/notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, readStatus: true } : notif
        )
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/api/notifications/mark-all-read', {}, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      fetchNotifications(); // Refresh the list
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read') return notif.readStatus;
    if (filter === 'unread') return !notif.readStatus;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.readStatus).length;

  if (!isRestaurantApproved) {
    return (
      <Container maxWidth="md" className="mt-8">
        <Alert severity="warning">
          <Typography variant="h6" className="mb-2">
            Restaurant Approval Required
          </Typography>
          <Typography variant="body2">
            You need to create and get your restaurant approved before you can view notifications.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="space-y-6 px-5 lg:px-20">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4">
          Restaurant Notifications
        </Typography>
        <Box className="flex gap-2">
          {unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} unread`} 
              color="primary" 
              size="small"
            />
          )}
          <Tooltip title="Refresh">
            <IconButton onClick={fetchNotifications} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
          {unreadCount > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton onClick={markAllAsRead}>
                <MarkEmailRead />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Filter */}
      <Box className="flex gap-2 mb-4">
        <Chip 
          label="All" 
          onClick={() => setFilter('all')}
          color={filter === 'all' ? 'primary' : 'default'}
          clickable
        />
        <Chip 
          label="Unread" 
          onClick={() => setFilter('unread')}
          color={filter === 'unread' ? 'primary' : 'default'}
          clickable
        />
        <Chip 
          label="Read" 
          onClick={() => setFilter('read')}
          color={filter === 'read' ? 'primary' : 'default'}
          clickable
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Notifications List */}
      {loading ? (
        <Typography>Loading notifications...</Typography>
      ) : filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <NotificationsIcon className="text-4xl text-gray-400 mb-4" />
            <Typography variant="h6" color="textSecondary">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'read' ? 'No read notifications' : 
               'No notifications yet'}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              {filter === 'all' && 'You\'ll receive notifications from the FoodOps team here.'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`transition-all ${!notification.readStatus ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <CardContent>
                <Box className="flex justify-between items-start">
                  <Box className="flex-1">
                    <Typography variant="body1" className="mb-2">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(notification.sentAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    {!notification.readStatus && (
                      <Chip 
                        label="Unread" 
                        color="primary" 
                        size="small"
                      />
                    )}
                    {!notification.readStatus && (
                      <Tooltip title="Mark as read">
                        <IconButton 
                          size="small" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          <MarkEmailRead fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantNotifications;
