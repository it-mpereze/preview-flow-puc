'use client';

import { useState } from 'react';

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {//componente en la cima de la gerarquia
  //variables de estado y especifica el estado inicial de tu aplicación:
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <main className="min-h-screen">
    <FilterableProductTable products={PRODUCTS} />
  </main> 
}

/**
 * Ahora que has identificado los componentes en el boceto, ordénalos en una jerarquía:
FilterableProductTable    - componente en sima de la gerarquia
  SearchBar               - componente hijo 
  ProductTable            - componente hijo
    ProductCategoryRow    - componente hijo
    ProductRow

    Después de construir tus componentes, tendrás una biblioteca de componentes reutilizables que renderizan tu modelo de datos. 

    Tu primer COMPONENTE
    Los componentes son uno de los conceptos esenciales de React. 
    Constituyen los cimientos sobre los que construyes interfaces de usuario (UIs por sus siglas en inglés). 
    ¡Y eso los convierte en el lugar perfecto para comenzar tu recorrido por React!

    El componente en la cima de la jerarquía (FilterableProductTable) tomará tu modelo de datos como una prop. 
    Este se conoce como flujo de datos en un sentido, porque estos datos fluyen hacia abajo desde el componente 
    en el nivel superior hacia aquellos que están al final del árbol.

    Para familiarisarme con los conseptos y terminologias
 */