import { useEffect, useState } from 'react';

enum NotificationPermission {
  DEFAULT = 'default',
  GRANTED = 'granted',
  DENIED = 'denied',
}

interface NotifyOptions {
  body?: string;
  icon?: string;
  href?: string;
  onClick?: (e: Event) => void;
}

export const useNotifier = () => {
  const [permission, setPermission] = useState(null);

  // Ask permission for desktop notifications
  useEffect(() => {
    const _permission = Notification.permission;
    if (_permission === NotificationPermission.DEFAULT) {
      Notification.requestPermission().then(function () {
        setPermission(NotificationPermission.GRANTED);
      });
    }
  }, []);

  // With permission, you can now notify
  const notify = (title: string, options?: NotifyOptions) => {
    if (!permission || permission === NotificationPermission.DENIED) {
      return;
    }

    const notification = new Notification(title, {
      body: options?.body ?? null,
      icon: options?.icon ?? null,
    });

    if (options?.href || options?.onClick) {
      notification.onclick = e => {
        if (options?.href) {
          window.location.href = options.href;
        }

        // Execute onClick if it exists
        options?.onClick?.(e);
      };
    }
  };

  return { notify, permission };
};
