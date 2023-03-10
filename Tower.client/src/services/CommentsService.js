import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log(['Getting comments by event Id'], res.data)
    AppState.comments = res.data
  }

  async postComment(body) {
    const res = await api.post(`api/comments`, body)
    logger.log(['Posting comment'], res.data)
    AppState.comments.push(res.data)
  }

  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }
}

export const commentsService = new CommentsService()