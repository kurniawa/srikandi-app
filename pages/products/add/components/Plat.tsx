const Plat = () => {
    return ( 
        <div className="form-control">
            <div className="label">
                <span className="label-text font-bold">plat</span>
            </div>
            <input
                type="number"
                placeholder="jumlah_plat..."
                name="jumlah_plat"
                className="input input-bordered input-sm w-full"
            />
        </div>
     );
}
 
export default Plat;