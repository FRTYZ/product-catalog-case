export interface BagTypes {
    id: string;
    image: string;
    title: string;
    price: number;
    amount: number;
}

export interface ShopBagType {
    bagItems: BagTypes[]
}