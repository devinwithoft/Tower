import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventService } from "../services/EventService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
      .get('/:eventId/tickets', this.getEventTickets)
  }

  async getAll(req, res, next) {
    try {
      const events = await eventService.getAll(req.query)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const event = await eventService.getOne(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newEvent = await eventService.create(req.body)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }


  async editEvent(req, res, next) {
    try {
      const event = await eventService.editEvent(req.body, req.params.id, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }


  async cancelEvent(req, res, next) {
    try {
      const message = await eventService.cancelEvent(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


  async getEventTickets(req, res, next) {
    try {
      let tickets = await ticketsService.getEventTickets(req.params.eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(req.params.eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}