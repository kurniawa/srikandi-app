const Ukuran = () => {
    return ( 
        <div className="form-control">
            <div className="label">
                <span className="label-text font-bold">ukuran(mm.)</span>
            </div>
            <input
                type="number"
                placeholder="ukuran..."
                name="ukuran"
                className="input input-bordered input-sm w-full"
            />
        </div>
     );
}
 
export default Ukuran;