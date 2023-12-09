const WarnaEmas = () => {
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">warna_emas</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="warna_emas"
            >
                <option value={'AT'}>AT</option>
                <option value={'GW'}>GW</option>
                <option value={'CC'}>CC</option>
                <option value={'KL'}>KL</option>
            </select>
        </div>
     );
}
 
export default WarnaEmas;