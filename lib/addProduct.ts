import { BaseSyntheticEvent } from "react";

export const addProduct = (e: BaseSyntheticEvent) => {
    const tipe_barang = e.target.tipe_barang.value;
    const tipe_perhiasan = e.target.tipe_perhiasan.value;

    let nama = e.target.nama.value.trim();
    if (nama === '') {
      return {status: 400, message: 'Nama barang?'};
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

    const deskripsi = e.target.deskripsi.value.trim();
    const warna_emas = e.target.warna_emas.value;
    const kondisi = e.target.kondisi.value;
    let cap = e.target.cap.value.trim();
    if (cap === '') {
      cap = null;
    }
    
    const warna_matas = e.target.warna_mata;
    const jumlah_matas = e.target.jumlah_mata;
    // console.log(warna_matas.length);
    let data_mata = [];

    if (warna_matas.length > 0) {
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
    }

    const mainans = e.target.mainan;
    const jumlah_mainans = e.target.jumlah_mainan;
    // console.log(mainans.length);
    let data_mainan = [];

    if (mainans.length > 0) {
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
    }

    const plat = e.target.jumlah_plat.value;
    // const nampan = e.target.nampan.value;
    console.log(cap)
    console.log(deskripsi)
    return {status: 400, message: 'test?'};

  };