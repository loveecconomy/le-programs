import BusRound from '@/models/bus_round';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { connectMongo } from '../../../../utils/connectMongo';

const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        await connectMongo();
        const { id } = req.query
        const data = JSON.parse(req.body)
        await BusRound.updateOne({ _id: id }, data);
        const busRound = await BusRound.findById(id);
        return res.status(200).json({ message: 'Update Successful', data: busRound, })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error })
    }

}



export default handler;