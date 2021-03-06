import { Broker} from '../types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts'
let brokers: Broker[] = [
    {
        id: "1",
        name: 'Ghanshyam',
        username: 'abc@gmail.com',
        company: 'Muthoot Finance'
    },
    {
        id: "2",
        name: 'Hardik',
        username: 'hardik@gmail.com',
        company: 'Vama Infratech'
    },
    {
        id: "3",
        name: 'Babubhai',
        username: 'babu@gmail.com',
        company: 'Happy Home Group'
    }
]

// @desc    Get all brokers
// @route   GET api/v1/brokers/

const getBrokers = ({response} : {response: any}) =>{
    response.body = {
        success: true,
        data: brokers
    }
}


// @desc    Get a broker
// @route   GET api/v1/brokers/:id

const getBroker = ({params, response} : {params: {id: string}, response: any}) =>{
    const broker: Broker | undefined = brokers.find(b => b.id === params.id)

    if(broker) {
        response.status = 200
        response.body = {
            success: true,
            data: broker
        }
    
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No broker found'
        }   
    }
}


// @desc    Add a broker
// @route   POST api/v1/brokers

const addBroker = async({request, response} : {request : any, response: any}) =>{
    const body = await request.body() 

    if(!request.hasBody) {
        response.status = 400,
        response.body = {
            success: false,
            msg: 'No data'
        }

    } else {
        const broker: Broker = body.value
        broker.id = v4.generate()
        brokers.push(broker)
        response.status = 201
        response.body = {
            success: true,
            data: broker
        }
    }
}

// @desc    Update a broker
// @route   PUT api/v1/brokers/:id

const updateBroker = async ({params, request, response} : {params: {id: string}, request: any, response: any}) =>{
    const broker: Broker | undefined = brokers.find(b => b.id === params.id)

    if(broker) {
        const body = await request.body()

        const updateData: { name?: string, username?: string, company?: string} = body.value

        brokers = brokers.map(b => b.id === params.id ? { ...b, ...updateData } : b)

        response.status = 200
        response.body = {
                success: true,
                data: brokers
        }
    
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No broker with that ID found'
        }   
    }
}

// @desc    Delete a broker
// @route   DELETE api/v1/brokers/:id

const deleteBroker = ({params, response} : {params: {id: string}, response: any}) =>{
    brokers = brokers.filter(b => b.id !== params.id)
    response.body = {
        success: true,
        msg: 'Broker removed'
    }
}

export { getBrokers, getBroker, addBroker, updateBroker, deleteBroker }