import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventService } from "../services/EventService.js"

class CommentsService {
  async createComment(body) {
    const event = await eventService.getOne(body.eventId)
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    await event.save()
    return (comment)
  }

  async getCommentsByEventId(eventId) {
    let comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }

  async removeComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (!comment) throw new BadRequest('No comment located')
    if (comment.creatorId.toString() != userId) throw new BadRequest("Cannot delete another's comment")
    const event = await eventService.getOne(comment.eventId)
    await comment.remove()
    await event.save()

    const message = `This comment has been deleted`
    return message
  }
}


export const commentsService = new CommentsService()