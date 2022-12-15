import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"

class TicketsService {

  async createTicket(body) {
    const event = await eventService.getOne(body.eventId)
    if (event.isCanceled) throw new Forbidden("Can't create ticket for cancelled event")
    if (event.capacity <= 0) throw new BadRequest("Can't create ticket for full event")
    const ticket = await dbContext.Tickets.create(body)
    await event.capacity--
    await event.save()
    await ticket.populate('profile')
    await ticket.populate('event')
    return (ticket)
  }


  async getAccountTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }

  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return tickets
  }

  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
    if (!ticket) throw new BadRequest('No ticket located')
    if (ticket.accountId.toString() != userId) throw new BadRequest('This is not your ticket to remove')
    const event = await eventService.getOne(ticket.eventId)
    await ticket.remove()

    event.capacity += 1
    await event.save()

    const message = `This ticket has been deleted`
    return message
  }
}



export const ticketsService = new TicketsService()