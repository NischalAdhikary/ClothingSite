import { asyncHandler } from '@/utils/asyncHandler.js';
import pool from '@/utils/db.js';
import { SendResponse } from '@/utils/response.js';
import { Request, Response } from 'express';

const getNavItems = asyncHandler(async (req: Request, res: Response) => {
  const query = `select p.name as product_name,
p.id as product_id,
 p.subcategory_id as subcategory_id,
 sc.name as subcategory_name,
 c.id as category_id,
 c.name as category_name
 from products p join 
 subcategories sc on
 p.subcategory_id= sc.id
join categories c on c.id=sc.category_id
`;
  const navResult = (await pool.query(query, [])).rows;

  const navItem = new Map();
  for (const item of navResult) {
    const {
      category_id,
      category_name,
      subcategory_id,
      subcategory_name,
      product_name,
      product_id,
    } = item;
    if (!navItem.has(category_id)) {
      navItem.set(category_id, {
        Category: category_name,
        id: category_id,
        subCategory: new Map(),
      });
    }
    const category = navItem.get(category_id);
    if (!category.subCategory.has(subcategory_id)) {
      category.subCategory.set(subcategory_id, {
        id: subcategory_id,
        label: subcategory_name,
        products: [],
      });
    }
    const subCategories = category.subCategory.get(subcategory_id);
    subCategories.products.push({ id: product_id, name: product_name });
  }
  const categoryList = Array.from(navItem.values()).map((cat) => {
    return { id: cat.id, label: cat.Category };
  });

  const category = Array.from(navItem.values()).map((cat) => ({
    ...cat,
    subCategory: Array.from(cat.subCategory.values()),
  }));

  SendResponse(res, 200, true, 'Fetched SuccessFully', { category, categoryList });
});
export { getNavItems };
