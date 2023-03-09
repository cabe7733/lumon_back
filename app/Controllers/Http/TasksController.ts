import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {

  public async index({ response }) {
    const tasks = await Task.all()
    return response.ok(tasks)
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const moment = await Task.create(body)

    response.status(201)

    return {
      message: 'Se ha ingresado la tarea con exito!',
      data: moment,
    }
  }

  public async show({ response,params }) {
    const id = params.id;
    const task = await Task.findBy('id', id)
    return response.ok(task)
  }

  public async destroy({ params }){
    const task = await Task.findOrFail(params.id)
    await task.delete()
    return {
      message:'la tarea ha sido eliminada',
      data: task
    }
  }

  public async update({ params, request }){

    const task = await Task.findOrFail(params.id)
    const body = request.body()

    task.description = body.description;
    task.priority = body.priority;
    task.state = body.state;
    task.incharge = body.incharge;
    task.tags = body.tags;

    await task.save()

    return {
      message: 'la tarea ha sido actualizada',
      data: task
    }

  }


}
