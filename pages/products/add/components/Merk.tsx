const Merk = () => {
    return ( 
        <div className="form-control">
            <div className="label">
                <span className="label-text font-bold">merk</span>
            </div>
            <input
                type="text"
                placeholder="merk..."
                name="merk"
                className="input input-bordered input-sm w-full"
            />
        </div>
     );
}
 
export default Merk;