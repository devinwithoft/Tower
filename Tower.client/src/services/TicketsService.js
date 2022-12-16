import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class TicketsService {
  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('Getting tickets by Id', res.data)
    AppState.tickets = res.data
  }


  async createTicket(body) {
    const res = await api.post('api/tickets', body)
    logger.log('creating ticket', res.data)
    AppState.tickets.push(res.data)
    AppState.activeEvent.capacity -= 1
  }

  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('Removed ticket')
    AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
    AppState.activeEvent.capacity += 1
  }
}

export const ticketsService = new TicketsService()