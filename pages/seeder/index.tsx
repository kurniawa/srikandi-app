import { db } from "@/firebase.config";
import { retrieveAllDataInCollection } from "@/lib/firebase/service";
import { caps, data_perhiasan, harga_pasarans, mainans, merks, modal_ongkos_cucis, opacity_warna_permatas, saturasi_warna_permatas, warna_emas, warna_permatas } from "@/lib/product_data";
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

    const handleWarnaEmasSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_warna_emas = await retrieveAllDataInCollection('warna_emas');
        avalaible_warna_emas.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'warna_emas', data.id));
        });
        warna_emas.forEach(async (data) => {
            await setDoc(doc(collection(db, 'warna_emas')), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('warna_emas seeding complete.')
    }

    const handleWarnaPermataSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_warna_permatas = await retrieveAllDataInCollection('warna_permatas');
        avalaible_warna_permatas.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'warna_permatas', data.id));
        });
        warna_permatas.forEach(async (data) => {
            await setDoc(doc(collection(db, 'warna_permatas')), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('warna_permatas seeding complete.')
    }

    const handleSaturasiWarnaPermataSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_saturasi_warna_permatas = await retrieveAllDataInCollection('saturasi_warna_permatas');
        avalaible_saturasi_warna_permatas.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'saturasi_warna_permatas', data.id));
        });
        saturasi_warna_permatas.forEach(async (data) => {
            await setDoc(doc(collection(db, 'saturasi_warna_permatas')), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('saturasi_warna_permatas seeding complete.')
    }

    const handleOpacityWarnaPermataSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_opacity_warna_permatas = await retrieveAllDataInCollection('opacity_warna_permatas');
        avalaible_opacity_warna_permatas.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'opacity_warna_permatas', data.id));
        });
        opacity_warna_permatas.forEach(async (data) => {
            await setDoc(doc(collection(db, 'opacity_warna_permatas')), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('opacity_warna_permatas seeding complete.')
    }

    const handleMainanSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_mainans = await retrieveAllDataInCollection('mainans');
        avalaible_mainans.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'mainans', data.id));
        });
        mainans.forEach(async (data) => {
            await setDoc(doc(collection(db, 'mainans')), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('mainans seeding complete.')
    }

    const handleCapSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_caps = await retrieveAllDataInCollection('caps');
        avalaible_caps.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'caps', data.id));
        });
        caps.forEach(async (data) => {
            await setDoc(doc(collection(db, 'caps')), {
                nama: data.nama,
                codename: data.codename,
                code: data.code,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('caps seeding complete.')
    }

    const handleMerkSeeding = async () => {
        setIsLoading(true);
        setFeedback('');
        // USER SEEDING
        const avalaible_merks = await retrieveAllDataInCollection('merks');
        avalaible_merks.forEach(async (data:any) => {
            // console.log(user);
            await deleteDoc(doc(db, 'merks', data.id));
        });
        merks.forEach(async (data) => {
            await setDoc(doc(collection(db, 'merks')), {
                nama: data.nama,
                codename: data.codename,
                short: data.short,
                code: data.code,
                edisi: data.edisi,
            });
        });
        // END - USER SEEDING
        setIsLoading(false);
        setFeedback('merks seeding complete.')
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
                <button className="btn btn-primary" onClick={handleWarnaEmasSeeding} disabled={isLoading}>
                    <span>Warna Emas Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleWarnaPermataSeeding} disabled={isLoading}>
                    <span>Warna Permata Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleSaturasiWarnaPermataSeeding} disabled={isLoading}>
                    <span>Saturasi Warna Permata Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleOpacityWarnaPermataSeeding} disabled={isLoading}>
                    <span>Opacity Warna Permata Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleMainanSeeding} disabled={isLoading}>
                    <span>Mainan Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleCapSeeding} disabled={isLoading}>
                    <span>Cap Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>

            <div className="mt-2">
                <button className="btn btn-primary" onClick={handleMerkSeeding} disabled={isLoading}>
                    <span>Merk Seeder</span>
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
                    <span>Modal Ongkos Cuci Seeder</span>
                    {isLoading && <span className="loading loading-spinner"></span>}
                </button>
            </div>
        </main>
    );
}
 
export default Seeder;