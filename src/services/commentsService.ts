import {v4} from 'uuid';

import {http} from '../client';
import {Comm, Post} from '../interfaces';

export class CommentsService {
  getComments(postId: string): Promise<Comm[]> {
    return http.get('comments.json')
      .then((comms: any) => Object.keys(comms)
        .map((key) => ({...comms[key]}))
        .filter((comm) => comm.postId === postId));
  }

  createComment(comment: Comm): Promise<void> {
    comment.id = v4();
    return http.post('comments.json', comment);
  }

  likeComment(id: string): Promise<void> {
    return http.get('comments.json').then((res: any) => {
      const key = Object.keys(res).find((key) => res[key].id === id);
      const userId = localStorage.getItem('fb-id');
      if (key) {
        const post: Post = {
          ...res[key],
          likes: res[key].likes ? [...res[key].likes, userId] : [userId]
        };
        return http.patch(`comments/${key}.json`, post);
      } else {
        throw new Error('Comment with such id is not found');
      }
    });
  }

  unlikeComment(id: string) {
    return http.get('comments.json').then((res: any) => {
      const key = Object.keys(res).find((key) => res[key].id === id);
      const userId = localStorage.getItem('fb-id');
      if (key) {
        const post: Post = {
          ...res[key],
          likes: res[key].likes.filter((user: string) => userId !== user)
        };
        return http.patch(`comments/${key}.json`, post);
      } else {
        throw new Error('Comment with such id is not found');
      }
    });
  }

  dislikeComment(id: string) {
    return http.get('comments.json').then((res: any) => {
      const key = Object.keys(res).find((key) => res[key].id === id);
      const userId = localStorage.getItem('fb-id');
      if (key) {
        const post: Post = {
          ...res[key],
          dislikes: res[key].dislikes ? [...res[key].dislikes, userId] : [userId]
        };
        return http.patch(`comments/${key}.json`, post);
      } else {
        throw new Error('Comment with such id is not found');
      }
    });
  }

  undislikeComment(id: string) {
    return http.get('comments.json').then((res: any) => {
      const key = Object.keys(res).find((key) => res[key].id === id);
      const userId = localStorage.getItem('fb-id');
      if (key) {
        const post: Post = {
          ...res[key],
          dislikes: res[key].dislikes.filter((user: string) => userId !== user)
        };
        return http.patch(`comments/${key}.json`, post);
      } else {
        throw new Error('Comment with such id is not found');
      }
    });
  }
}
