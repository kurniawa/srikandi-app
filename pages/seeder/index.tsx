import { db } from "@/firebase.config";
import { retrieveAllDataInCollection } from "@/lib/firebase/service";
import { data_perhiasan, harga_pasarans, modal_ongkos_cucis, specs } from "@/lib/product_data";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const Seeder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleDataPerhiasanSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_data_perhiasan = await retrieveAllDataInCollection('data_perhiasan');
        avalaible_data_perhiasan.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, "data_perhiasan", data.id));
        });
        data_perhiasan.forEach(async (data) => {
            await setDoc(doc(collection(db, "data_perhiasan")), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
                jenis: data.jenis,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('data_perhiasan seeding complete.')
    }

    const handleSpecSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_specs = await retrieveAllDataInCollection('specs');
        avalaible_specs.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, "specs", data.id));
        });
        specs.forEach(async (data) => {
            await setDoc(doc(collection(db, "specs")), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
                jenis: data.jenis,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('specs seeding complete.')
    }

    const handleHargaPasaranSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_harga_pasarans = await retrieveAllDataInCollection('harga_pasarans');
        avalaible_harga_pasarans.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, "harga_pasarans", data.id));
        });
        harga_pasarans.forEach(async (data) => {
            await setDoc(doc(collection(db, "harga_pasarans")), {
                golongan_kadar: data.golongan_kadar,
                harga_gr: data.harga_gr,
                ongkos_cuci_gr: data.ongkos_cuci_gr,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('harga_pasarans seeding complete.')
    }

    const handleModalOngkosCuciSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_modal_ongkos_cucis = await retrieveAllDataInCollection('modal_ongkos_cucis');
        avalaible_modal_ongkos_cucis.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, "modal_ongkos_cucis", data.id));
        });
        modal_ongkos_cucis.forEach(async (data) => {
            await setDoc(doc(collection(db, "modal_ongkos_cucis")), {
                kategori_tipe_perhiasan: data.kategori_tipe_perhiasan,
                kategori_warna_emas: data.kategori_warna_emas,
                modal_ongkos_cuci: data.modal_ongkos_cuci,
                per: data.per,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('modal_ongkos_cucis seeding complete.')
    }

    return ( 
        <main className="p-2">
            {feedback && <div className="alert alert-warning">{feedback}</div>}

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleDataPerhiasanSeeding} disabled={isLoading}>
                    <span>Data Perhiasan Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleSpecSeeding} disabled={isLoading}>
                    <span>Specs Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleHargaPasaranSeeding} disabled={isLoading}>
                    <span>Harga Pasaran Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleModalOngkosCuciSeeding} disabled={isLoading}>
                    <span>Modal Ongkos Cuci</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>
        </main>
    );
}
 
export default Seeder;