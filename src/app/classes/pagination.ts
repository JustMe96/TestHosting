export class Pagination {
count: number = 0;
current_page: number = 0;
next_page: number | null = null;
per_page: number = 0;
previous_page: number | null = null;
total: number = 0;
total_pages: number = 0;

  constructor(data: any) {
    this.count = data.count;
    this.current_page = data.current_page;
    this.next_page = data.next_page;
    this.per_page = data.per_page;
    this.previous_page = data.previous_page;
    this.total = data.total;
    this.total_pages = data.total_pages;
  }
}
