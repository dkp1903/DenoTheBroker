import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getBrokers, getBroker, addBroker, updateBroker, deleteBroker } from './controllers/brokers.ts'

const router = new Router()
router.get('/api/v1/brokers', getBrokers)
        .get('/api/v1/brokers/:id', getBroker)
        .post('/api/v1/brokers/', addBroker)
        .put('/api/v1/brokers/:id', updateBroker)
        .delete('/api/v1/brokers/:id', deleteBroker)

export default router