const Keterangan = () => {
    return ( 
    <div className="form-control w-full">
        <div className="label">
            <span className="label-text font-bold">keterangan (opt.)</span>
        </div>
        <textarea
        className="textarea textarea-bordered h-24"
        placeholder="keterangan..."
        name="keterangan"
        ></textarea>
    </div> 
  );
}
 
export default Keterangan;