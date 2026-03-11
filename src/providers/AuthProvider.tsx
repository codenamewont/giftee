import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  hasSignedInBefore: boolean;
  isAuthResolved: boolean;
};
const HAS_SIGNED_IN_BEFORE_KEY = 'hasSignedInBefore';
const AuthContext = createContext<AuthContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [hasSignedInBefore, setHasSignedInBefore] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [{ data }, storedValue] = await Promise.all([
        supabase.auth.getSession(),
        AsyncStorage.getItem(HAS_SIGNED_IN_BEFORE_KEY),
      ]);

      if (!mounted) return;

      setSession(data.session);
      setHasSignedInBefore(storedValue === 'true' || !!data.session);
      setIsAuthResolved(true);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      setSession(nextSession);

      if (event === 'SIGNED_IN' && nextSession) {
        setHasSignedInBefore(true);
        await AsyncStorage.setItem(HAS_SIGNED_IN_BEFORE_KEY, 'true');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, hasSignedInBefore, isAuthResolved }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
