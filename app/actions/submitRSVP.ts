"use server"

import { strings } from "../utils/strings";
import { createClient } from "../utils/supabase/server"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRSVP(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get('name');
    const email = formData.get('email');
    const accompany = formData.get('accompany');
    const attendance = formData.get('attendance');

    

    const { data , error } = await supabase.from('rsvp').insert([{
        name,
        email,
        accompany,
        attendance
    }]);

    console.log(data , 'data_submitRSVP');
    if (error) {
        console.error('Error inserting RSVP: ', error);
        return { success: false, message: 'Error inserting RSVP' , error };
        
    }

    if (!strings.sendToEmail) {
        console.error('No email to send RSVP to');
        return { success: false, message: 'No email to send RSVP to' };
        
    }

    try {
        await resend.emails.send({
            from: 'RSVP <onboarding@resend.dev>',
            to: strings.sendToEmail,
            subject: 'New RSVP submission',
            html: `
                <h1>New RSVP submission</h1>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Accompany: ${accompany}</p>
                <p>Attendance: ${attendance}</p>
                `
        })
    } catch (error) {
        console.error('Error sending email: ', error);
    }

    return { success: true, message: 'RSVP submitted successfully' };
    

}