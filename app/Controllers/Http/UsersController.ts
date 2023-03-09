import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }) {
    const Users = await User.all()
    return response.ok(Users)
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const moment = await User.create(body)

    response.status(201)

    return {
      message: 'Se ha ingresado el usuario con exito!',
      data: moment,
    }
  }
}
