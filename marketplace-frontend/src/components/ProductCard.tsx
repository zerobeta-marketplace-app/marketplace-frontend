import { Product } from "../redux/product/productSlice";

interface ProductCardProps {
  product: Product;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
      <h2>{product.productName}</h2>
      <p>{product.shortDescription}</p>
      <p>${product.price}</p>
    </div>
  );
};