import ListOfProducts from "./ListOfProducts";
import CurrencyWidget from "../../redux/components/CurrencyWidget";

export default function Home() {
  return (
    <div>
      <CurrencyWidget />
      <ListOfProducts />
    </div>
  );
}
