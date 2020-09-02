import { CampaignRow } from './../service/campaigns-data/types';
import sumBy from 'lodash/sumBy';

export default {
    /**
     * Naive strategy. Displays every nth point from dataset
     *
     * @param {CampaignRow[]} points
     * @param {number} modulo
     * @returns {CampaignRow[]}
     */
    'naive': (points:CampaignRow[], modulo:number) => points.filter((r:CampaignRow, i:number) => !(i%modulo)),
    /**
     * Forward strategy. Every displayed point is an average of all points between an actual point and NEXT displayed point.
     *
     * .....................|........................|........................|........................|........................
     *                                               |<-                    ->|
     *                                               p - avg of set marked above
     *
     * @param {CampaignRow[]} points
     * @param {number} modulo
     * @returns {CampaignRow[]}
     */
    'forward': (points:CampaignRow[], modulo:number) => {
        const pointsToReturn:CampaignRow[] = [];
        const sets:number = Math.ceil(points.length / modulo);

        for(let i:number = 0; i < sets; i++) {
            const slice = points.slice(i * modulo, (i + 1) * modulo);

            pointsToReturn.push({
                ...points[i * modulo],
                Clicks: Math.ceil(sumBy(slice, 'Clicks') / slice.length),
                Impressions: Math.ceil(sumBy(slice, 'Impressions') / slice.length),
            });
        }

        return pointsToReturn;
    },
    /**
     * Backward strategy. Every displayed point is an average of all points between an actual point and PREVIOUS displayed point.
     *
     * .....................|........................|........................|........................|........................
     *                      |<-                    ->|
     *                                               p - avg of set marked above
     *
     * @param {CampaignRow[]} points
     * @param {number} modulo
     * @returns {CampaignRow[]}
     */
    'backward': (points:CampaignRow[], modulo:number) => {
        const pointsToReturn:CampaignRow[] = [];
        const sets:number = Math.ceil(points.length / modulo);

        for(let i:number = 1; i < sets + 1; i++) {
            const slice = points.slice((i - 1) * modulo, i * modulo);

            pointsToReturn.push({
                ...points[i * modulo],
                Clicks: Math.ceil(sumBy(slice, 'Clicks') / slice.length),
                Impressions: Math.ceil(sumBy(slice, 'Impressions') / slice.length),
            });
        }

        return pointsToReturn;
    },
    /**
     * Middle strategy. Combination of forward and backward strategies
     *
     * .....................|........................|........................|........................|........................
     *                                   |<-                    ->|
     *                                               p - avg of set marked above
     *
     * @param {CampaignRow[]} points
     * @param {number} modulo
     * @returns {CampaignRow[]}
     */
    'middle': (points:CampaignRow[], modulo:number) => {
        const pointsToReturn:CampaignRow[] = [];
        const sets:number = Math.ceil(points.length / modulo);

        for(let i:number = 1; i < sets + 1; i++) {
            const slice = points.slice((i - 1) * modulo + modulo / 2, i * modulo + modulo / 2);

            pointsToReturn.push({
                ...points[i * modulo],
                Clicks: Math.ceil(sumBy(slice, 'Clicks') / slice.length),
                Impressions: Math.ceil(sumBy(slice, 'Impressions') / slice.length),
            });
        }

        return pointsToReturn;
    }
}