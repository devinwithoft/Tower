import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
  async getAll() {
    const res = await api.get('api/events')
    logger.log('[Get all events]', res.data)
    AppState.events = res.data
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    logger.log(`[Get event by Id]`, res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log('[Created event]', res.data)
    AppState.events.push(res.data)
    return res.data
  }

  async editEvent(eventId, body) {
    const res = await api.put(`api/events/${eventId}`, body)
    AppState.activeEvent = res.data
  }

  async cancelEvent(eventId) {
    await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = true
  }
}

export const eventsService = new EventsService()