import { db } from "@/firebase.config";
import { retrieveAllDataInCollection } from "@/lib/firebase/service";
import { data_perhiasan } from "@/lib/product_data";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const Seeder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleUserSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const available_users = await retrieveAllDataInCollection('data_perhiasan');
        available_users.forEach(async (user:any) => {
            // console.log(user);
            await deleteDoc(doc(db, "users", user.id));
        });
        data_perhiasan.forEach(async (data) => {
            await setDoc(doc(collection(db, "data_perhiasan")), {
                // fullname: data.fullname,
                // username: data.username,
                // email: data.email,
                // email_verified: data.email_verified,
                // // password: bcryptjs.hash(user.password, 10),
                // tempat_lahir: data.tempat_lahir,
                // tanggal_lahir: data.tanggal_lahir,
                // role: data.role,
                // created_at: Date.now(),
                // updated_at: Date.now(),
              });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('seeding complete.')
    }

    return ( 
        <main className="p-2">
            <button className="btn btn-primary">Data Perhiasan Seeder</button>
        </main>
    );
}
 
export default Seeder;