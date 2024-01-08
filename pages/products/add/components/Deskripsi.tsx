const Deskripsi = () => {
    
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">deskripsi (opt.)</span>
            </div>
            <div>
            <input
              type="text"
              placeholder="deskripsi..."
              name="deskripsi"
              className="input input-bordered input-sm w-full"
            />
            </div>
        </div>
    );
}
 
export default Deskripsi;