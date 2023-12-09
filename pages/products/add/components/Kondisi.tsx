const Kondisi = () => {
    return ( 
        <div className="form-control w-full">
            <div className="label">
                <span className="label-text font-bold">kondisi</span>
            </div>
            <select
            className="select select-bordered select-sm"
            name="kondisi"
            >
                <option value={99}>99</option>
                <option value={80}>80</option>
                <option value={70}>70</option>
                <option value={60}>60</option>
                <option value={50}>50</option>
            </select>
        </div>
     );
}
 
export default Kondisi;