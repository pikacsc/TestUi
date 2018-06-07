export class Product {
  // $key: string;
  // productId: number;
  // productName: string;
  // productCategory: string;
  // productPrice: number;
  // productDescription: string;
  // productImageUrl: string;
  // productAdded: number;
  // productQuatity: number;
  // ratings: number;
  // favourite: boolean;
  // productSeller: string;

  public p_code: string;
  public p_name: string;
  public p_count: number;
  public p_kind: string;
  public p_price : number;
  public p_sellprice: number;
  public p_profit : number;
  public p_content : string;
  public p_img : string;
  public p_date : Date;

  public updateFrom(src: Product): void {
    this.p_code = src.p_code;
    this.p_name = src.p_name;
    this.p_count = src.p_count;
    this.p_kind = src.p_kind;
    this.p_price = src.p_price;
    this.p_sellprice = src.p_sellprice;
    this.p_profit = src.p_profit;
    this.p_content = src.p_content;
    this.p_img = src.p_img;
    this.p_date = src.p_date;

  }



}
