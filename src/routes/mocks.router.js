import {Router} from 'express'
import {generateMockUsers} from '../mocks/mockUsers.js'
import {generateMockPets} from '../mocks/mockPets.js'
import UserModel from '../dao/models/User.js'
import PetModel from '../dao/models/pet.js'

const router=Router()

router.get('/mockingpets',(req,res)=>{
    const pets=generateMockPets(50)
    res.json({status:'success',pets})
})

router.get('/mockingusers',(req,res)=>{
    const users=generateMockUsers(50)
    res.json({status:'success',users})
})

router.post('/generateData',async(req,res)=>{
    const usersQty=parseInt(req.query.users)||0
    const petsQty=parseInt(req.query.pets)||0

    try{
        const users=generateMockUsers(usersQty)
        const insertedUsers=await UserModel.insertMany(users)

        const userIds=insertedUsers.map(user=>user._id)

        const pets=generateMockPets(petsQty,userIds)
        const insertedPets=await PetModel.insertMany(pets)

        res.json({
            status:'success',
            insertedUsers:insertedUsers.length,
            insertedPets:insertedPets.length,
        })
    }catch(error){
        res.status(500).json({status:'error',error:error.message})
    }
})

export default router