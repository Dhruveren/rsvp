"use client"
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@radix-ui/react-label';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { strings } from '../utils/strings';
import { Calendar } from '@/components/ui/calendar';
import { submitRSVP } from '../actions/submitRSVP';

const RSVPForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [accompany, setAccompany] = useState<string | null>(null);
    const [attendance, setAttendance] = useState("yes");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            setErrors({ name: "Name is required" }); 
            return; 
        }
        if(!email){
            setErrors({ email: "Email is required" });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('accompany', accompany || "");
        formData.append('attendance', attendance);


        console.log('formData', formData);
        setIsLoading(true);

        const response = await submitRSVP(formData);

        if (response.success) {
            toast({
                title: "Success",
                description: strings.thankYouMessage,
            })

            // Reset form
            setName("");
            setEmail("");
            setAccompany(null);
            setAttendance("yes");
            setErrors({});
        }else{
            toast({
                title: "Error",
                description: response.message,
                variant: "destructive"
            });
            // TODO: Check if the email is already submitted 
            if (response.error) {
                if (response.error.code === '23505') {
                    setErrors({ email: "This email is already submitted" });
                    
                }
            }
        }

        setIsLoading(false);

    }
    const openGoogleMaps = () => {
        const encodedLocation = encodeURIComponent(strings.eventLocation);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`);
        
    }
  return (
    <div className='mx-w-md mx-auto my-10'>
      <h1 className='text-2xl font-bold mb-4'>{strings.title}</h1>
      <p className='mb-6'>{strings.description}</p>

      <div className='mb-6'>
        <Label>{strings.eventDateLabel}</Label>
        {/* <p>{new Date(strings.eventDate).toLocaleDateString()}</p> */}
        <Calendar
            mode='single'
            selected={new Date(strings.eventDate)}
            className='rouded-md border flex flex-col items-center'
            fromDate={new Date(strings.eventDate)}
            toDate={new Date(strings.eventDate)}
            defaultMonth={new Date(strings.eventDate)}
            ISOWeek
        />
        
        <div className='mt-4'>
            <Button type='button' variant={"outline"} className='w-full' onClick={openGoogleMaps}>
                <MapPin/>
                {strings.viewOnMapButton}
            </Button>

        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className=''>
            <Label htmlFor='name'>{strings.nameLabel}</Label>
            <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            {errors.name && (
                <p className='text-red-500, text-sm mt-1'>
                    {errors.name}
                </p>
            )}
        </div>
        <div className=''>
            <Label htmlFor='email'>{strings.emailLabel}</Label>
            <Input
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {errors.email && (
                <p className='text-red-500, text-sm mt-1'>
                    {errors.email}
                </p>
            )}
        </div>
        <div>
            <Label htmlFor='accompany'>{strings.accompanyLabel}</Label>
            <Input
                id='accompany'
                type='number'
                min="0"
                value={accompany || ""}
                onChange={(e) => setAccompany(e.target.value)}
                
            />
            
        </div>
        <div className="space-y-4">
                <Label className="text-base font-medium">{strings.rsvpLabel}</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className={`flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer ${
                            attendance === 'yes' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setAttendance('yes')}
                    >
                        <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                attendance === 'yes'
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-400'
                            }`}>
                                {attendance === 'yes' && (
                                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                                )}
                            </div>
                            <Label className="cursor-pointer">{strings.yesOption}</Label>
                        </div>
                    </div>

                    <div
                        className={`flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer ${
                            attendance === 'no'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setAttendance('no')}
                    >
                        <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                attendance === 'no'
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-400'
                            }`}>
                                {attendance === 'no' && (
                                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                                )}
                            </div>
                            <Label className="cursor-pointer">{strings.noOption}</Label>
                        </div>
                    </div>
                </div>
            </div>
        <Button disabled={isLoading} type='submit'>
            {isLoading ? "Sending..." : strings.submitButton}
        </Button>
      </form>


      
    </div>
  )
}

export default RSVPForm
