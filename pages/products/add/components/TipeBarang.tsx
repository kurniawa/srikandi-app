interface TipeBarangProps {
    tipe_barang: string
}

const TipeBarang = ({tipe_barang}: TipeBarangProps) => {
    // console.log(tipe_barang)
    return ( 
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">tipe_barang</span>
          </div>
          <input
            type="text"
            placeholder="tipe_barang..."
            name="tipe_barang"
            className="input input-bordered input-sm w-full bg-neutral bg-opacity-10 text-rose-900 font-semibold text-opacity-20"
            defaultValue={tipe_barang}
            readOnly
          />
        </div>
    );
}
 
export default TipeBarang;