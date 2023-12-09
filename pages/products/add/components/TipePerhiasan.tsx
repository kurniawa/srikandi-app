const TipePerhiasan = () => {
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">tipe_perhiasan</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="warna_emas"
            >
                <option value={'AT'}>AT</option>
                <option value={'GW'}>GW</option>
                <option value={'CC'}>CC</option>
                <option value={'GLR'}>GLR</option>
                <option value={'GLB'}>GLB</option>
                <option value={'KL'}>KL</option>
                <option value={'Lion'}>Lion</option>
            </select>
        </div>
    );
}
 
export default TipePerhiasan;