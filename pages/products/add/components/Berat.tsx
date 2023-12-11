const Berat = () => {
    return ( 
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">berat(gr.)</span>
          </div>
          <input
            type="text"
            placeholder="berat..."
            name="berat"
            className="input input-bordered input-sm w-full"
          />
        </div>
    );
}
 
export default Berat;