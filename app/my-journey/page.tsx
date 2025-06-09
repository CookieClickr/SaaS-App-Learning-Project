import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserCompanion, getUserSessions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
    const user = await currentUser()
    if (!user) redirect('/sign-in');
    const companions = await getUserCompanion(user.id);
    const sessionHistory = await getUserSessions(user.id);

    return (
        <main className="min-lg:w-3/4">
            <section className="flex justify-between gap-4 max-sm:flex-col items-center">
                <div className="flex gap-4 items-center">
                    <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} className="rounded-lg" />
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col border border-black rounded-lg p-3 gap-3 h-fit">
                        <div className="flex gap-2 items-center">
                            <Image src="/icons/check.svg" alt="checkmark" height={22} width={22} />
                            <p className="text-2xl font-bold">{sessionHistory.length}</p>
                        </div>
                        <div>Lessons completed</div>
                    </div>
                    <div className="flex flex-col border border-black rounded-lg p-3 gap-3 h-fit">
                        <div className="flex gap-2 items-center">
                            <Image src="/icons/cap.svg" alt="checkmark" height={22} width={22} />
                            <p className="text-2xl font-bold">{companions.length}</p>
                        </div>
                        <div>Companions created</div>
                    </div>
                </div>
            </section>
            <Accordion type="multiple">
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-2xl font-bold">Recent Sessions</AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList title="Recent Sessions" companions={companions}/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="companions">
                    <AccordionTrigger className="text-2xl font-bold">My Companions {`(${companions?.length})`}</AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList title="My Companions" companions={companions}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
};

export default Profile;