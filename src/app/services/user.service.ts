import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { Person, User } from '../classes/user';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private server: ServerService) { }

  async getAdmins(): Promise<any> {
    const res: any = await this.server.POST('admin/list');
    const pagination: Pagination = new Pagination(res.links);
    return {users: res.data.map((u: any) => u.user), pagination};
  }

  async addUser(user: Person): Promise<User> {
    const res = await this.server.POST('admin/user/create', {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role_code: user.role_code
    });
    if(res.errors) {
      if(res.errors.email) throw new Error(res.errors.email[0]);
      else throw new Error('Qualcosa è andato storto');
    }
    return res.data.user;
  }

  async editUser(user: User): Promise<User> {
    try {
      const res = await this.server.POST('admin/user/edit', {
        id: user.id,
        code: user.code,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role_code: user.role_code
      });
      return res.data.user;
    } catch (error) {
      console.log(error);
      throw new Error('Error');
    }
  }

  async getUserInfo(code: string): Promise<User> {
    const res = await this.server.POST('admin/user/show', { code });
    return res.data.user;
  }

  async deleteUsers(codes: string[]): Promise<void> {
    await this.server.POST('admin/user/delete', {codes});
  }
}

