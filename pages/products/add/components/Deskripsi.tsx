const Deskripsi = () => {
    return ( 
    <div className="form-control w-full">
        <div className="label">
            <span className="label-text font-bold">deskripsi</span>
        </div>
        <textarea
        className="textarea textarea-bordered h-24"
        placeholder="deskripsi..."
        name="deskripsi"
        ></textarea>
    </div> 
  );
}
 
export default Deskripsi;