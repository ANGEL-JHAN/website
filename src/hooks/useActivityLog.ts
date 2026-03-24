import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const useActivityLog = () => {
  const { user } = useAuth();

  const logActivity = useCallback(async (action: string, details?: string) => {
    if (!user) return;
    await supabase.from("activity_logs").insert({
      user_id: user.id,
      action,
      details,
    });
  }, [user]);

  return { logActivity };
};
