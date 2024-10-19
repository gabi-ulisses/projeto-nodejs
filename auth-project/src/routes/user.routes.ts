import { Router } from "express"
import CreateUserService from "../services/users/CreateUser/index.service"

const UserRouter = Router()
UserRouter.post('/', async (request, response) =>{
    const responseDate = await CreateUserService.create(request.body)
})

//UserRouter.get('/', async(request,response) => {
//       response.send({message: 'Hello World!'})
//   })

export default UserRouter