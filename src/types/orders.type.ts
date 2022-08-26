export type order = {
  status: string;
  user_id: string;
};
export type order_product = {
  product_id: string;
  order_id: string;
  quantity: number;
};
