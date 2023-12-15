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
    const harga_gr = e.target.harga_gr.value;
    const harga_t = e.target.harga_t.value;
    const deskripsi = e.target.deskripsi.value.trim();
    const warna_emas = e.target.warna_emas.value;
    const kondisi = e.target.kondisi.value;
    let cap = e.target.cap.value.trim();
    if (cap === '') {
      cap = null;
    }
    let warna_mata = null;
    let jumlah_mata = null;
    if (e.target.warna_mata) {
      warna_mata = e.target.warna_mata.value;
      jumlah_mata = e.target.jumlah_mata.value;
    }

    let mainan = null;
    let jumlah_mainan = null;
    if (e.target.mainan) {
      mainan = e.target.mainan.value;
      jumlah_mainan = e.target.jumlah_mainan.value;
    }

    // const plat = e.target.plat.value;
    // const nampan = e.target.nampan.value;
    console.log(cap)
    console.log(deskripsi)
    return {status: 400, message: 'berat isNaN?'};

  };