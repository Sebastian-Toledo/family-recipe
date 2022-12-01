export default interface Recipe {
  imageURL: string;
  title: string;
  description: string;
  ingredients: string[];
  method: string;
  author: string;
  id: string;
  likes: number;
}
