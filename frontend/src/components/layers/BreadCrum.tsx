import { Link } from "react-router-dom";

export default function BreadCrum({ category, subcategory }) {
  const categoryLabel = category ? category.split("-")[0] : "";
  const subcategoryLabel = subcategory ? subcategory.split("-")[0] : "";

  return (
    <div className="text-2xl flex gap-2 font-bold font-secondary">
      <Link to={"/"}>Home</Link>
      {category && (
        <>
          <span>{">"}</span>
          <Link to={`/product/${category}`}>{categoryLabel}</Link>
        </>
      )}
      {subcategory && (
        <>
          <span>{">"}</span>
          <Link to={`/product/${category}/${subcategory}`}>
            {subcategoryLabel}
          </Link>
        </>
      )}
    </div>
  );
}
