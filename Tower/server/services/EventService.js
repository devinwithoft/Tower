import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventService {
  async getAll() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }

  async getOne(id) {
    const event = await dbContext.Events.findById(id).populate('creator')
    if (!event) throw new BadRequest(`No event found`)

    return event
  }

  async create(body) {
    const newEvent = await dbContext.Events.create(body)
    return newEvent
  }

  async editEvent(body, eventId, userId) {
    let event = await this.getOne(eventId)
    if (event.creatorId != userId) throw new Forbidden('Cannot edit an event you didnt create')
    if (event.isCanceled == true) throw new BadRequest('Cannot edit a cancelled event')
    event.name = body.name ? body.name : event.name
    event.description = body.description ? body.description : event.description
    // event.coverImg = body.coverImg ? body.coverImg : event.coverImg
    // event.location = body.location ? body.location : event.location
    // event.capacity = body.capacity ? body.capacity : event.capacity
    // event.startDate = body.startDate ? body.startDate : event.startDate
    // event.type = body.type ? body.type : event.type

    await event.save()
    return event
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getOne(eventId)
    if (event.creatorId != userId) throw new Forbidden('Cannot cancel an event you didnt create')
    if (event.isCanceled == true) throw new BadRequest('This event was already cancelled')

    event.isCanceled = !event.isCanceled

    await event.save()
    return `cancelled ${event.name}`
  }


}


export const eventService = new EventService()