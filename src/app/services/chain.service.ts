import { Injectable } from '@angular/core';
import { Category, Product } from '../classes/category';
import { Chain, ChainOriginInfo } from '../classes/chain';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  private chainOriginInfos!: ChainOriginInfo[];
  private chains!: Chain[];
  private categories!: Category[];
  private products!: Product[];

  constructor(private server: ServerService) { }

  async getProducts(refresh: boolean = false, page: number = 1, search: string = '', validated: boolean = false): Promise<Product[]> {
    if (!refresh && this.products) return this.products;
    let url = 'admin/product/search';
    if(page > 1) url += `?page=${page}`;
    const res = await this.server.POST(url, { name: search, validated: true });
    this.products = res.data;
    return this.products;
  }

  async editCategory(category: Category, chainId: number): Promise<Category> {
    const res = await this.server.POST('admin/category/edit', {
      code: category.code,
      name: category.name,
      chain_id: chainId
    });
    return res.data;
  }

  async addCategory(category: Category, chainId: number): Promise<Category> {
    const res = await this.server.POST('admin/category/add', {
      name: category.name,
      chain_id: chainId
    });
    if (res.errors) {
      if (res.errors.email) throw new Error(res.errors.email[0]);
      else throw new Error('Qualcosa è andato storto');
    }
    await Promise.all([
      this.getChains(true),
      this.getCategories(true),
    ])
    return res.data;
  }

  async getCategoryChain(category: Category): Promise<Chain | null> {
    const ch = await this.getChains();
    for(let i=0; i<ch.length; i++) {
      const cat = ch[i].categories.find(e => e.code === category.code);
      if(cat) return ch[i];
    }
    return null;
  }

  async getCategoryInfo(code: string): Promise<Category> {
    const res = await this.server.POST('admin/category/show', { code });
    return res.data;
  }

  async getCategories(refresh: boolean = false): Promise<Category[]> {
    if (!refresh && this.categories) return this.categories;
    const res = await this.server.POST('admin/category/list', { products: true });
    this.categories = res.data;
    return this.categories;
  }

  async editChain(chain: Chain): Promise<Chain> {
    const res = await this.server.POST('admin/chain/edit', {
      code: chain.code,
      name: chain.name,
      chain_info_id: chain.chain_info.id
    });
    return res.data;
  }

  async addChain(chain: Chain): Promise<Chain> {
    const res = await this.server.POST('admin/chain/add', {
      name: chain.name,
      chain_info_id: chain.chain_info.id
    });
    if (res.errors) {
      if (res.errors.email) throw new Error(res.errors.email[0]);
      else throw new Error('Qualcosa è andato storto');
    }
    await this.getChains(true);
    return res.data;
  }

  async getChainInfo(code: string): Promise<Chain> {
    const res = await this.server.POST('admin/chain/show', { code });
    return res.data;
  }

  async deleteChain(code: string) {
    await this.server.POST('admin/chain/delete', { code });
    await this.getChains(true);
  }

  async getChains(refresh: boolean = false): Promise<Chain[]> {
    if (!refresh && this.chains) return this.chains;
    const res = await this.server.POST('admin/chain/list', { show: 'active', categories: true });
    this.chains = res.data;
    return this.chains;
  }

  async getChainOriginInfos(): Promise<ChainOriginInfo[]> {
    if (this.chainOriginInfos) return this.chainOriginInfos;
    const res = await this.server.POST('admin/chain/info/list');
    this.chainOriginInfos = res.data.map((e: any) => {
      return {
        id: e.id,
        chain_info_code: e.chain_info_code
      }
    });
    return this.chainOriginInfos;
  }
}

