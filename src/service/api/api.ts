import config from './../../config';
import * as Papa from 'papaparse';

export default async function getData() {
    let data = await fetch(config.data.source)
                        .then((response:any) => response.body.getReader().read())
                        .then((result:any) => (new TextDecoder('utf-8')).decode(result.value));

    return new Promise((resolve, reject) => {
        try {
            Papa.parse(data, {
                worker: true,
                header: true,
                dynamicTyping: true,
                delimiter: ',',
                skipEmptyLines: true,
                complete:  (result:any) => {
                    // console.log('parsing complete', result);
                    resolve(result.data);
                },
                error: (error:any) => {
                    // console.warn('parsing error', error);
                    reject(error);
                }
            });
        } catch (e) {
          reject(e);
        }
    });
}
