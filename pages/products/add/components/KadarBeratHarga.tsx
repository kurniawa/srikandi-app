import formatPrice from "@/lib/format";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import Kadar from "./Kadar";

const KadarBeratHarga = () => {
  // FUNGSI BERAT
  const [berat, setBerat] = useState(0.0);
  const [errorBerat, setErrorBerat] = useState('');
  const [statusBerat, setStatusBerat] = useState('406'); // not accepted
  
  const handleInputBerat = (e:BaseSyntheticEvent) => {
    const berat_val = e.target.value.trim();

    if (berat_val === '') {
      setErrorBerat('')
      setStatusBerat('406')
      return
    }

    if (isNaN(berat_val)) {
      setErrorBerat('isNaN')
      setStatusBerat('406')
      return
    } else {
      const float_berat = parseFloat(berat_val)
      setBerat(float_berat);
      setErrorBerat('')
      setStatusBerat('202')
      // countHargaTotal()
    }

  }
  // END - FUNGSI BERAT

  // FUNGSI HARGA_GR
  const [hargaGr, setHargaGr] = useState(0.00);
  const [formattedHargaGr, setFormattedHargaGr] = useState('');
  const [statusHargaGr, setStatusHargaGr] = useState('406');
  
  const handleInputHargaGr = (e:BaseSyntheticEvent) => {
    const val = e.target.value.trim();

    if (val === '') {
      setFormattedHargaGr('?')
      setStatusHargaGr('406')
      return
    }
    
    if (isNaN(val)) {
      setFormattedHargaGr('?')
      setStatusHargaGr('406')
      return
    } else {
      const float_val = parseFloat(val);
      const val_100 = float_val * 100;
      
      // console.log(parseFloat(val));
      // console.log(formatPrice(val_100))
      setFormattedHargaGr(formatPrice(val_100))
      setStatusHargaGr('202')
      setHargaGr(float_val);
    }

  }
  // END - FUNGSI HARGA_GR
  
  // FUNGSI HARGA_T
  const [hargaT, setHargaT] = useState(0.00);
  const [formattedHargaT, setFormattedHargaT] = useState('');
  const [statusHargaT, setStatusHargaT] = useState('406');

  const handleInputHargaT = (e:BaseSyntheticEvent) => {
    const harga_t_val = e.target.value.trim();

    if (harga_t_val === '') {
      setFormattedHargaT('')
      setStatusHargaT('406')
      return
    }

    if (isNaN(harga_t_val)) {
      setFormattedHargaT('isNaN')
      setStatusHargaT('406')
      return
    } else {
      setHargaT(parseFloat(harga_t_val));
      setFormattedHargaT(formatPrice(harga_t_val))
      setStatusHargaT('202')
    }

  }
  
  useEffect(() => {
    if (statusBerat === '202' && statusHargaGr === '202') {
      const harga_total = berat * hargaGr
      // console.log(harga_total);
      setHargaT(harga_total);
      setFormattedHargaT(formatPrice(harga_total * 100))
      setStatusHargaT('202')
    }
  }, [berat, hargaGr, statusBerat, statusHargaGr])

  useEffect(() => {
    if (statusBerat === '202' && statusHargaT === '202') {
      // console.log('test')
      const harga_gr = hargaT / berat;
      setHargaGr(harga_gr)
      setFormattedHargaGr(formatPrice(harga_gr * 100))
      setStatusHargaGr('202')
    }
  }, [hargaT, berat, statusBerat, statusHargaT])
  
  // END - FUNGSI HARGA_T

    return (
      <>
        <div className="grid grid-cols-2 gap-2">
          <Kadar></Kadar>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">berat(gr.)</span>
            </div>
            <input
              type="text"
              placeholder="berat..."
              name="berat"
              className="input input-bordered input-sm w-full"
              onChange={handleInputBerat}
            />
            <div className="text-xs flex justify-center">{errorBerat}</div>
            <input type="hidden" name="status_berat" value={statusBerat} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">harga_gr</span>
            </div>
            <input
              type="text"
              placeholder="harga_gr..."
              name="harga_gr"
              className="input input-bordered input-sm w-full"
              onChange={(e) => handleInputHargaGr(e)}
              value={hargaGr}
            />
            <div className="text-xs flex justify-center">{formattedHargaGr}</div>
            <input type="hidden" name="status_harga_gr" value={statusHargaGr} />
          </div>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">harga_t</span>
            </div>
            <input
              type="text"
              placeholder="harga_t..."
              name="harga_t"
              className="input input-bordered input-sm w-full"
              onChange={(e) => handleInputHargaT(e)}
              value={hargaT}
            />
            <div className="text-xs flex justify-center">{formattedHargaT}</div>
            <input type="hidden" name="status_harga_t" value={statusHargaT} />
          </div> 
        </div>
      </>
    );
}
 
export default KadarBeratHarga;