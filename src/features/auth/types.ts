import type { Session } from '@supabase/supabase-js';

export type AuthState = {
  session: Session | null;
  hasSignedInBefore: boolean;
  isAuthResolved: boolean; // 앱 시작 후 세션 복원 확인이 끝났는지
};
