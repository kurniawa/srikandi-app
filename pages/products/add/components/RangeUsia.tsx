const RangeUsia = () => {
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">range_usia</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="range_usia"
            >
                <option value={'dewasa'}>dewasa</option>
                <option value={'anak'}>anak</option>
            </select>
        </div>
     );
}
 
export default RangeUsia;