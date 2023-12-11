const Nama = () => {
    return ( 
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">nama</span>
          </div>
          <input
            type="text"
            placeholder="nama..."
            name="nama"
            className="input input-bordered input-sm w-full"
          />
        </div> 
    );
}
 
export default Nama;