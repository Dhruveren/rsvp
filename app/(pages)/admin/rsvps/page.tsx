import RSVPTable from "@/app/_components/RSVPTable";
import { signOut } from "@/app/actions/auth";
import { getRSVPs } from "@/app/actions/getRSVPs";
import { Button } from "@/components/ui/button";
import { House} from "lucide-react";
import Link from "next/link";



export default async function RSVPsPage() {
    const {success , data , message} = await getRSVPs();

    // TODO: redirect to login page if no auth 

    if (!success) {
        return <div className="container mx-auto mt-8 p-4">Error:{message}</div>
        
    }


    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All RSVPs</h1>
                <div className="flex items-center gap-2">
                    <Link href={"/"}>
                        <Button variant={"outline"}>
                            <House/>
                        </Button>
                    </Link>
                    {/* Logout */}
                    <form action={signOut} >
                        <Button variant={"outline"}>Sign out</Button>
                    </form>
                    
                </div>
            </div>
            {/* table */}
            <RSVPTable data={data || []}/>


        </div>
    )

}