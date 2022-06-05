import {http} from '../client';
import {User} from '../interfaces';

export class UserService {
  getAllUsers(): Promise<User[]> {
    return http.get('users.json').then((res: any) => {
      return Object.keys(res).map((key) => ({...res[key]}));
    });
  }

  getUsersByIds(ids: string[]): Promise<User[]> {
    return this.getAllUsers().then((users) => users.filter((user) => {
      for (const id of ids) {
        if (user.id === id) {
          return true;
        }
      }
      return false;
    }));
  }

  getUserById(id: string): Promise<User | null> {
    return http.get('users.json').then((res: any) => {
      return Object.keys(res)
        .map((key) => ({...res[key]}))
        .find((user) => user.id === id)[0] || null;
    });
  }
}
