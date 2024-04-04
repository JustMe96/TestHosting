import { Category } from "./category";

export interface Chain {
  id: number;
  code: string;
  name: string;
  chain_info: ChainOriginInfo;
  categories: Category[];
}

export interface ChainOriginInfo {
  chain_info_code: string;
  id: number;
}
