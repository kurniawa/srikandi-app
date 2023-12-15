import formatPrice from "@/lib/format";
import { BaseSyntheticEvent, useState } from "react";

const HargaT = () => {
  const [formattedVal, setFormattedVal] = useState('');

  const handleFormat = (e:BaseSyntheticEvent) => {
    const val = e.target.value;
    if (!isNaN(val)) {
      const float_val = parseFloat(val);
      const val_100 = float_val * 100;

      // console.log(parseFloat(val));
      // console.log(formatPrice(val_100))
      setFormattedVal(formatPrice(val_100))
    } else {
      setFormattedVal('?')
    }
  }
    return ( 
        <></>
    );
}
 
export default HargaT;