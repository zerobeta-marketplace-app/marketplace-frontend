import { Product } from "../redux/product/productSlice";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white w-full">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">{product.productName}</h2>

      <table className="w-full text-sm text-left text-gray-700 border-t border-gray-100">
        <tbody>
          <tr className="border-b">
            <th className="py-2 font-medium w-1/3">Product Code:</th>
            <td className="py-2">{product.productCode}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2 font-medium">Description:</th>
            <td className="py-2">{product.shortDescription}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
