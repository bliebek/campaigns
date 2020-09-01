import config from './../../config';
import * as Papa from 'papaparse'

export default async function getData() {
  return new Promise((resolve, reject) => {
    try {
        console.log('AA', config.data.source);
        Papa.parse(config.data.source, {
            worker: true,
            download: true,
            header: true,
            dynamicTyping: true,
            delimiter: ',',

            complete:  (result:any) => {
                console.log('parsing complete', result);
                resolve(result.data);
            },
            error: (error:any, file:any) => {
                console.warn('parsing error', error, file);
                reject(error);
            }
        });
    } catch (e) {
      reject(e);
    }
  });
}
