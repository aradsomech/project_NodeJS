type ICardInput = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  address: IAddress;
  image?: IImage;
};
export type ICard = ICardInput & {
  _id?: string;
  taskNumber: number;
  title: string;
  bizNumber?: number;
  userId?: string;

  likes: string[];
  createdAt: Date;
};

export type ICard = {
  _id?: string;
  taskNumber: number;
  title: string;
  bizNumber?: number;
  userId?: string;

  likes: string[];
  createdAt: Date;
};
