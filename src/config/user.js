import supabase from "./SupabaseClient";

export const getuser = async() => {
    
        const { data } = await supabase.auth.getUser();
    
        return data?.user;
      };
