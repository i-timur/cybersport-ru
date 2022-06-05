import {v4} from 'uuid';

import {http} from '../client';
import {Post} from '../interfaces';
import {comparePosts, makeArrayOf} from '../utils';

export class PostsService {
  getAllPosts(): Promise<Post[]> {
    const posts = http.get('posts.json');
    const comms = http.get('comments.json');
    return Promise.all([posts, comms])
      .then((res: any) => {
        const posts: Post[] = makeArrayOf(res[0]).sort(comparePosts);
        const comms = Object.keys(res[1]).map((key) => ({...res[1][key]}));
        const postsWithComments = posts.map((post: any) => {
          return {
            ...post,
            comments: comms.filter((comm: any) => {
              return comm.postId === post.id;
            })
          };
        });
        return postsWithComments;
      });
  }

  create(post: Post): Promise<void> {
    post.id = v4();
    return http.post('posts.json', post);
  }

  getById(id: string): Promise<Post | null> {
    return http.get('posts.json').then((res: any) => {
      return Object.keys(res)
        .map((key) => ({...res[key]}))
        .filter((post) => post.id === id)[0] || null;
    });
  }

  getPostsByCategory(category: string): Promise<Post[]> {
    return this.getAllPosts().then((posts) => posts.filter((post) => post.postType.value === category));
  }

  getPostsByGame(game: string): Promise<Post[]> {
    return this.getAllPosts().then((posts) => posts.filter((post) => post.game.value === game));
  }

  getPostsByCategoryAndGame(category: string, game: string): Promise<Post[]> {
    return this.getAllPosts().then((posts) => posts.filter((post) => post.game.value === game && post.postType.value === category));
  }
}
