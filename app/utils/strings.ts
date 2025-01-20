import { Description } from "@radix-ui/react-toast";
import { title } from "process";
import { deserialize } from "v8";

export const strings = {
    title: "RSVP",
    description: "Give reminder to anyone you want to invite , and make sure they attend the program .",
    eventDate: "2025-01-01",
    eventDateLabel: "Event Date",
    eventLocation: "Central Park, New York, NY 10022" , 
    eventLocationLabel: "Event Location",
    nameLabel: "Full Name" , 
    emailLabel: "Email Address", 
    accompanyLabel: "Number of People", 
    rsvpLabel: "Will you attend?",
    yesOption: "Yes, I'll be there!", 
    noOption: "Sorry, I can't make it", 
    submitButton: "Send RSVP",
    thankYouMessage: "Thank you for your response!", 
    viewOnMapButton: "View Location on Google Maps" , 
    sendFromEmail: "onboarding@resend.dev", 
    sendToEmail: process.env. EMAIL_TO,
}