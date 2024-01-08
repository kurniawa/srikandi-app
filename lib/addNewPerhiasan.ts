import { db } from "@/firebase.config";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { BaseSyntheticEvent } from "react";
import { retrieveAllDataInCollection } from "./firebase/service";

export const addNewPerhiasan = async (e: BaseSyntheticEvent) => {

  const tipe_barang = e.target.tipe_barang.value;
  const tipe_perhiasan = e.target.tipe_perhiasan.value;

  const jenis_perhiasan = e.target.jenis_perhiasan.value;
  // console.log(jenis_perhiasan);
  if (jenis_perhiasan === '') {
    return {status: 400, message: 'Jenis perhiasan?'};
  }

  let deskripsi = e.target.deskripsi.value.trim();
  if (deskripsi = '') {
    deskripsi = null;
  }

  let kadar = e.target.kadar.value.trim();
  // console.log(kadar);
  if (kadar === '') {
    return {status: 400, message: 'kadar?'};
  } else {
    if (isNaN(kadar)) {
      return {status: 400, message: 'kadar isNaN?'};
    }
    kadar = parseFloat(kadar);
    kadar = Math.round((kadar + Number.EPSILON) * 100) / 100
  }
  // console.log(kadar);

  let berat = e.target.berat.value.trim();
  // console.log(berat);
  if (berat === '') {
    return {status: 400, message: 'berat?'};
  } else {
    if (isNaN(berat)) {
      return {status: 400, message: 'berat isNaN?'};
    }
    berat = parseFloat(berat);
    berat = Math.round((berat + Number.EPSILON) * 100) / 100
    // berat = berat.toFixed(2);
  }
  // console.log(berat);
  let status_harga_gr = e.target.status_harga_gr.value;
  let harga_gr = 0.00;
  if (status_harga_gr === '202') {
    harga_gr = Math.round((parseFloat(e.target.harga_gr.value) + Number.EPSILON) * 100) / 100;
  } else {
    return {status: 400, message: 'harga_gr?'};
  }
  // console.log(status_harga_gr);
  // console.log(harga_gr);
  let status_harga_t = e.target.status_harga_t.value;
  let harga_t = 0.00;
  if (status_harga_t === '202') {
    harga_t = Math.round((parseFloat(e.target.harga_t.value) + Number.EPSILON) * 100) / 100;
  } else {
    return {status: 400, message: 'harga_t?'};
  }

  const nama = e.target.nama.value.trim();
  if (nama === '') {
    return {status: 400, message: 'Nama barang?'};
  }

  

  const warna_emas = e.target.warna_emas.value;
  const kondisi = e.target.kondisi.value;
  let cap = e.target.cap.value.trim();
  if (cap === '') {
    cap = null;
  }
  
  const warna_matas = e.target.warna_mata;
  const jumlah_matas = e.target.jumlah_mata;
  const toggle_mata = e.target.toggle_mata.checked;

  // console.log(toggle_mata);
  // console.log(toggle_mata.checked);
  // console.log(warna_matas.value);
  // console.log(jumlah_matas.length);
  let data_mata = null;

  if (toggle_mata && !warna_matas) {
      return {status: 400, message: 'checked mata but?'};
  }

  if (warna_matas) {
    data_mata = []
    if (warna_matas.value !== '') {
      let jumlah_mata = jumlah_matas.value;
      if (!isNaN(jumlah_mata)) {
        jumlah_mata = parseInt(jumlah_mata);
        let warna_mata = warna_matas.value.trim();
        if (warna_mata) {
          data_mata.push(
            {
              warna_mata: warna_mata,
              jumlah: jumlah_mata
            }
          );
        }
      }
    } else if (warna_matas.length > 0) {
      for (let i = 0; i < warna_matas.length; i++) {
        let jumlah_mata = jumlah_matas[i].value;
        if (!isNaN(jumlah_mata)) {
          jumlah_mata = parseInt(jumlah_mata);
          let warna_mata = warna_matas[i].value.trim();
          if (warna_mata) {
            data_mata.push(
              {
                warna_mata: warna_mata,
                jumlah: jumlah_mata
              }
            );
          }
        }
      }
    } else {
      return {status: 400, message: 'mata exist?'};
    }
  }

  const mainans = e.target.mainan;
  const jumlah_mainans = e.target.jumlah_mainan;
  const toggle_mainan = e.target.toggle_mainan.checked;
  // console.log(mainans.length);
  let data_mainan = null;

  if (toggle_mainan && !mainans) {
    return {status: 400, message: 'checked mainan but?'};
  }

  if (mainans) {
    data_mainan = [];
    if (mainans.value !== '') {
      let jumlah_mainan = jumlah_mainans.value;
      if (!isNaN(jumlah_mainan)) {
        jumlah_mainan = parseInt(jumlah_mainan);
        let mainan = mainans.value.trim();
        if (mainan) {
          data_mainan.push(
            {
              mainan: mainan,
              jumlah: jumlah_mainan
            }
          );
        }
      }
    } else if (mainans.length > 0) {
      for (let i = 0; i < mainans.length; i++) {
        let jumlah_mainan = jumlah_mainans[i].value;
        if (!isNaN(jumlah_mainan)) {
          jumlah_mainan = parseInt(jumlah_mainan);
          let mainan = mainans[i].value.trim();
          if (mainan) {
            data_mainan.push(
              {
                mainan: mainan,
                jumlah: jumlah_mainan
              }
            );
          }
        }
      }
    } else {
      return {status: 400, message: 'mainan exist?'};
    }
  }

  let jumlah_plat = e.target.jumlah_plat;
  // console.log(jumlah_plat)
  if (jumlah_plat) {
    jumlah_plat = e.target.jumlah_plat.value;
    if (jumlah_plat === '' || isNaN(jumlah_plat)) {
      return {status: 400, message: 'jumlah_plat exist, but format?'};
    }
  } else {
    jumlah_plat = null;
  }
  // console.log(jumlah_plat)

  let nampan = e.target.nampan;
  // console.log(nampan)
  if (nampan) {
    nampan = e.target.nampan.value.trim();
    if (nampan === '') {
      return {status: 400, message: 'nampan exist, but format?'};
    }
  } else {
    nampan = null;
  }
  // console.log(nampan)

  const range_usia = e.target.range_usia.value;

  let ukuran = e.target.ukuran;
  // console.log(ukuran)
  if (ukuran) {
    ukuran = e.target.ukuran.value;
    if (ukuran === '' || isNaN(ukuran)) {
      return {status: 400, message: 'ukuran?'};
    }
  } else {
    ukuran = null;
  }
  // console.log(ukuran)

  let merk = e.target.merk;
  // console.log(merk)
  if (merk) {
    merk = e.target.merk.value.trim();
    if (merk === '') {
      return {status: 400, message: 'merk exist, but?'};
    }
  } else {
    merk = null;
  }
  // console.log(merk)

  const barcode = null;
  const status = 'ada';
  const edisi = null;
  const stock = 1;

  // cari terlebih dahulu, apakah ada barang yang sama?
  const q = query(collection(db, "perhiasans"), where("nama", "==", nama));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    let ava_namas = '';
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      ava_namas += `- ${doc.data().nama} -`;
    });
    return {status: 400, message: `nama barang sudah ada! ${ava_namas}`}
  }

  let keterangan = e.target.keterangan.value;
  if (keterangan === '') {
    keterangan = null;
  }

  console.log({
    tipe_barang: tipe_barang,
    tipe_perhiasan: tipe_perhiasan,
    jenis_perhiasan: jenis_perhiasan,
    deskripsi: deskripsi,
    kadar: kadar,
    berat: berat,
    nama: nama,
    warna_emas: warna_emas,
    harga_gr: harga_gr, // meskipun harga dapat berubah sewaktu-waktu, tergantung harga pasaran, tapi tetap lebih baik tercatat disini juga.
    harga_t: harga_t,
    range_usia: range_usia,
    data_mata: data_mata,
    data_mainan: data_mainan,
    jumlah_plat: jumlah_plat,
    cap: cap,
    ukuran: ukuran,
    nampan: nampan,
    merk: merk,
    edisi: edisi,
    kondisi: kondisi,
    status: status,
    stock: stock,
    barcode: barcode,
    keterangan: keterangan,
  });

  // await setDoc(doc(collection(db, "products")), {
  //   tipe_barang: tipe_barang,
  //   tipe_perhiasan: tipe_perhiasan,
  //   jenis_perhiasan: jenis_perhiasan,
  //   deskripsi: deskripsi,
  //   range_usia: range_usia,
  //   warna_emas: warna_emas,
  //   data_mata: data_mata,
  //   data_mainan: data_mainan,
  //   jumlah_plat: jumlah_plat,
  //   cap: cap,
  //   ukuran: ukuran,
  //   nampan: nampan,
  //   merk: merk,
  //   edisi: edisi,
  //   kadar: kadar,
  //   berat: berat,
  //   kondisi: kondisi,
  //   nama: nama,
  //   status: status,
  //   stock: stock,
  //   barcode: barcode,
  //   keterangan: keterangan,
  // });

  // // redirect('/products')

  // // const router = useRouter()
  // // router.push("/")

  return {
    status: 202, message: 'values accepted',
  };

};