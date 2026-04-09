import * as React from 'react';
import { firebaseAuth } from '../../services/firebase';

export default function useAuthState() {
  const [user, setUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((nextUser) => {
      setUser(nextUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  return { user, initializing };
}

