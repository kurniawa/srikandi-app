const Plat = () => {
    return ( 
        <div className="form-control">
            <div className="label">
                <span className="label-text font-bold">plat</span>
            </div>
            <input
                type="number"
                placeholder="plat..."
                name="plat"
                className="input input-bordered input-sm w-full"
                min={0}
            />
        </div>
     );
}
 
export default Plat;