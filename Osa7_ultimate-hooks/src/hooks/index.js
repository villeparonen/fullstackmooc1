

import { useState } from 'react'

export const useResource = (type) => {
    const [value, setValue] = useState('')


  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onClick = (e) => {
    console.log("event", e)
    if(typeof e==="undefined") {
        // Clicking button returns event undefined and only this should be able to change state.
        setValue("")
    } else {
        // Do something fancy here if clicking input fields?
    }
  }


  return {
    type,
    value,
    onChange,
    onClick
  }
}
