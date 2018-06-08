import React from 'react'

export default {
    bodyUrlencoded: (params) => {
        let data = Object.entries(params);
        let str = `${data[0][0]}=${data[0][1]}`;
        data.forEach((item, i) => {
            if (i > 0) {
                str += `&&${item[0]}=${item[1]}`;
            }
        })
        return str
    }
}


