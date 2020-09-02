import config from './../../config';
import * as Papa from 'papaparse';

export default async function getData() {
    return new Promise((resolve, reject) => {
        try {
            Papa.parse(config.data.source, {
                download: true,
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
