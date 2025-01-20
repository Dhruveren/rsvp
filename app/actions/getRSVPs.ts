"use server";

import { createClient } from "../utils/supabase/server";

export async function getRSVPs () {
    const supabase = await createClient();
    const {data, error} = await supabase.from('rsvp').select('*');

    if (error) {
        console.log("Error fetching RSVPs: ", error);
        return { succsses: false, message: "Failed to fetch RSVPs"}
    }
    console.log(data, "data");
    
    return{ success: true, data };
}