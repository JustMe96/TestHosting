import { Injectable } from '@angular/core';

const DOMAIN = 'https://test3.ingrosso.bio/api/v1'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  TOKEN: string = '';

  constructor() { }

  async AUTHENTICATE(email: string, password: string): Promise<any> {
    const body = JSON.stringify({ email, password, locale_code: "ITALIAN" });
    const res = await fetch(`${DOMAIN}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    });
    return await res.json();
  }

  async POST(endpoint: string, body: any | null = null): Promise<any> {
    if(body) body = JSON.stringify(body);
    const res = await fetch(`${DOMAIN}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'authentication': `Bearer ${this.TOKEN}`
      },
      body
    });
    return await res.json();
  }
}
