import { asyncHandler } from '@/utils/asyncHandler.js';
import { SendErrorResponse, SendResponse } from '@/utils/response.js';
import { Request, Response } from 'express';
import * as productService from '@/services/productService.js';
import pool, { queryWithClient } from '@/utils/db.js';
import {
  addVaraints,
  deleteVaraints,
  generalProductDetail,
  updateVaraints,
} from '@/services/product.update.js';

const createProduct = async (req: Request, res: Response) => {
  const { product, variant } = req.body;
  console.log('product', product);

  console.log(req.body);
  if (!product || !variant || variant.length === 0) {
    return SendErrorResponse(res, 400, false, 'Provide required data');
  }
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const productquery = `INSERT INTO products (name,base_price,price,subcategory_id,description,created_by) VALUES
    ($1,$2,$3,$4,$5,$6) RETURNING id,name`;
    const productRes = await client.query(productquery, [
      product.name,
      Number(product.base_price),
      Number(product.price),
      product.subcategory,
      product.description,
      'bd4087bc-e7e6-4fd6-92fc-e72c93a3a1ad',
    ]);

    const productId = productRes.rows[0];

    console.log(typeof productId);

    for (const v of variant) {
      const variantquery = `INSERT INTO productvariants (product_id,color_id,size_id) VALUES ($1,$2,$3) RETURNING id`;
      const values = [productId.id, v.color_id, v.size_id];
      const productvar = await client.query(variantquery, values);
      const variantid = productvar.rows[0].id;
      const inventory_query = `INSERT INTO inventory (productvariant_id,quantity) VALUES($1,$2)`;
      console.log('All working till here');
      console.log(variantid, v.quantity);
      await client.query(inventory_query, [variantid, Number(v.quantity)]);
    }
    await client.query('COMMIT');
    return SendResponse(res, 201, true, 'product creted successfully', productId.name);
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    client.release();
  }
};
const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  console.log(limit, offset);
  const result = await queryWithClient(async (client) => {
    const countResult = await client.query(`SELECT COUNT(*) FROM products`);
    const total = Number(countResult.rows[0].count);
    const query = `SELECT
  p.id AS product_id,
  
  p.name AS product_name,
  price,
  base_price,
  description,
  ct.id as category_id,
  sc.id as subcategory_id,
  v.id AS variant_id,
  c.id AS color_id,
  s.id AS size_id,
  i.quantity
FROM products p
 JOIN productvariants v ON v.product_id = p.id
 JOIN subcategories sc ON sc.id = p.subcategory_id
 JOIN categories ct ON ct.id = sc.category_id
 JOIN colors c ON c.id = v.color_id
 JOIN sizes s ON s.id = v.size_id
 JOIN inventory i ON i.productvariant_id = v.id
 where p.id in (
select id from products limit $1 offset $2
 )`;

    const dataResult = await client.query(query, [limit, offset]);

    return { total, rows: dataResult.rows };
  });

  const Rows = result.rows;
  const productFit = {};
  for (const row of Rows) {
    const product_id = row.product_id;
    if (!productFit[product_id]) {
      productFit[product_id] = {
        productid: row.product_id,
        product_name: row.product_name,
        description: row.description,
        price: row.price,
        category_id: row.category_id,
        subcategory_id: row.subcategory_id,
        base_price: row.base_price,
        variants: [],
      };
    }
    productFit[product_id].variants.push({
      variant_id: row.variant_id,
      color_id: row.color_id,
      size_id: row.size_id,
      quantity: row.quantity,
    });
  }

  const finalResult = Object.values(productFit);
  res.json({
    data: finalResult,
    total: result.total,
    page,
    limit,
    totalPages: Math.ceil(result.total / limit),
  });
});
const getFilteredProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category, subcategory, search, page = 1, limit = 6 } = req.query;

  const offset = (page - 1) * limit;

  let conditions = [];
  let values = [];
  let idx = 1;

  if (category) {
    conditions.push(`sb.category_id = $${idx++}`);
    values.push(category);
  }

  if (subcategory) {
    conditions.push(`sb.id = $${idx++}`);
    values.push(subcategory);
  }

  if (search) {
    conditions.push(`p.name ILIKE '%' || $${idx++} || '%'`);
    values.push(search);
  }

  const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
  const totalCountQuery = `SELECT COUNT(*) AS count FROM products p JOIN subcategories sb ON sb.id = p.subcategory_id ${whereClause}
  `;
  const totalCountResult = await pool.query(totalCountQuery, values);

  const productIdQuery = `
    SELECT p.id
    FROM products p
    JOIN subcategories sb ON sb.id = p.subcategory_id
    ${whereClause}
    ORDER BY p.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const productIds = await pool.query(productIdQuery, values);

  if (productIds.rows.length === 0) {
    return res.json([]);
  }
  const count = productIds.rows.length;
  console.log('Product Id Numbers', count);

  const ids = productIds.rows.map((r) => r.id);

  const finalQuery = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.price,
      v.id AS variant_id,
      c.id AS color_id,
      s.id AS size_id, 
      i.quantity
    FROM products p
    JOIN productvariants v ON v.product_id = p.id
    JOIN colors c ON c.id = v.color_id
    JOIN sizes s ON s.id = v.size_id
    JOIN inventory i ON i.productvariant_id = v.id
    WHERE p.id = ANY($1)
  `;

  const finalResult = await pool.query(finalQuery, [ids]);
  const formatedForm = {};
  for (let v of finalResult.rows) {
    const productid = v.product_id;
    if (!formatedForm[productid]) {
      formatedForm[productid] = {
        productid: v.product_id,
        product_name: v.product_name,
        price: v.price,
        base_price: v.base_price,
        description: v.description,
        variants: [],
      };
    }
    if (formatedForm[productid]) {
      formatedForm[productid].variants.push({
        variant_id: v.variant_id,
        color_id: v.color_id,
        size_id: v.size_id,
        quantity: v.quantity,
      });
    }
  }
  console.log(formatedForm);
  const finalForm = Object.values(formatedForm);

  res.json({ data: finalForm, total: Math.ceil(totalCountResult.rows[0].count / limit) });
});
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    SendErrorResponse(res, 400, false, 'Provide the product id');
  }
  const product = await productService.prodcutById(id);
  if (!product) {
    return SendErrorResponse(res, 404, false, 'No Product Found');
  }
  return SendResponse(res, 200, true, 'Product Found', product);
});
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Provide the Id');
  }
  const product = await productService.deleteProduct(id);
  if (!product) {
    return SendErrorResponse(res, 404, false, 'No Product Available');
  }
  return SendResponse(res, 200, true, 'Product Deleted Successfully', product);
});
const deleteproductvariants = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Provide the Id');
  }
  const productvariant = await productService.deleteProdcutVariant(id);
  if (!productvariant) {
    return SendErrorResponse(res, 404, false, 'No Variant Found');
  }
  return SendResponse(res, 200, true, 'Variant Deleted Successfully', productvariant);
});
const productvariant = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Provide the Id');
  }
  const productvariant = await productService.productVariantById(id);
  if (!productvariant) {
    return SendErrorResponse(res, 404, false, 'No Productvariant Available');
  }
  return SendResponse(res, 200, true, 'Productvariant Found', productvariant);
});
// const updateProduct = asyncHandler(async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { productid, product, variants } = req.body;
//   console.log(variants.deleted);
//   let count = 0;

//   const productUpdated = Object.keys(product).length > 0;
//   const deletedProductId = variants.deleted.length > 0;
//   const updatedVariants = variants.edited.length > 0;
//   const newVariants = variants.newAdded.length > 0;
//   const updateArray = [productUpdated, deletedProductId, updatedVariants, newVariants];
//   for (const item of updateArray) {
//     if (item) {
//       count++;
//     }
//   }
//   if (count > 1) {
//     const client = await pool.connect();
//     console.log('Now');

//     try {
//       await client.query('BEGIN');
//       if (productUpdated) {
//         const updateFieldKeys = Object.keys(product);
//         const updateFieldValue = Object.values(product);
//         const query = `UPDATE products
//       SET ${updateFieldKeys.map((key, index) => `${key}=$${index + 1}`).join(', ')}
//       WHERE id=$${updateFieldKeys.length + 1}
//       RETURNING *`;

//         const data = await client.query(query, [...updateFieldValue, productid]);
//         console.log(data.rows[0]);
//       }
//       if (deletedProductId) {
//         for (const var_id of variants.deleted) {
//           console.log('Deleting variant _id', var_id);
//         }
//       }
//       if (newVariants) {
//         console.log('here we are adding new variants');
//         const addProductVariantQuery = `INSERT INTO productvariants (product_id,color_id,size_id) VALUES ($1,$2,$3 ) RETURNING id`;
//         const variant_ids = [];
//         console.log(variants.newAdded);
//         for (const v of variants.newAdded) {
//           const values = [productid, v.color_id, v.size_id];
//           const result = await client.query(addProductVariantQuery, values);
//           variant_ids.push(result.rows[0].id);
//         }
//         const addInventoryQuery = `INSERT INTO inventory (productvariant_id,quantity) VALUES ($1,$2)`;
//         for (let i = 0; i < variant_ids.length; i++) {
//           const inventoryValues = [variant_ids[i], variants.newAdded[i].stock];
//           await client.query(addInventoryQuery, inventoryValues);
//         }
//       }
//       if (updatedVariants) {
//         const updateVariantsQuery = `UPDATE productvariants SET product_id=$1,color_id=$2,size_id=$3 WHERE id=$4 RETURNING *`;
//         const variannt_ids = [];
//         for (const v of variants.edited) {
//           const values = [productid, v.color_id, v.size_id, v.variant_id];
//           const result = await client.query(updateVariantsQuery, values);
//           console.log('updated variants', result.rows[0]);
//           variannt_ids.push(result.rows[0].id);
//         }
//         const updateInventoryQuery = `UPDATE inventory SET quantity=$1 WHERE productvariant_id=$2 RETURNING *`;
//         for (let i = 0; i < variannt_ids.length; i++) {
//           const inventoryValues = [variants.edited[i].stock, variannt_ids[i]];
//           await client.query(updateInventoryQuery, inventoryValues);
//         }
//       }
//       await client.query('COMMIT');
//     } catch (e) {
//       console.log(e);
//       await client.query('ROLLBACK');
//     } finally {
//       client.release();
//     }
//   } else if (count === 1 && (newVariants || updatedVariants)) {
//     if (newVariants) {
//       const client = await pool.connect();

//       try {
//         await client.query('BEGIN');
//         console.log('here we are adding new variants');
//         const addProductVariantQuery = `INSERT INTO productvariants (product_id,color_id,size_id) VALUES ($1,$2,$3 ) RETURNING id`;
//         const variant_ids = [];
//         console.log(variants.newAdded);
//         for (const v of variants.newAdded) {
//           const values = [productid, v.color_id, v.size_id];
//           const result = await client.query(addProductVariantQuery, values);
//           variant_ids.push(result.rows[0].id);
//         }
//         const addInventoryQuery = `INSERT INTO inventory (productvariant_id,quantity) VALUES ($1,$2)`;
//         for (let i = 0; i < variant_ids.length; i++) {
//           const inventoryValues = [variant_ids[i], variants.newAdded[i].stock];
//           await client.query(addInventoryQuery, inventoryValues);
//         }
//         await client.query('COMMIT');
//         return SendResponse(res, 200, true, 'Product updated successfully');
//       } catch (e) {
//         console.log(e);
//         await client.query('ROLLBACK');
//       } finally {
//         client.release();
//       }
//     } else if (updatedVariants) {
//       const client = await pool.connect();
//       try {
//         await client.query('BEGIN');
//         const updateVariantsQuery = `UPDATE productvariants SET product_id=$1,color_id=$2,size_id=$3 WHERE id=$4 RETURNING *`;
//         const variannt_ids = [];
//         for (const v of variants.edited) {
//           const values = [productid, v.color_id, v.size_id, v.variant_id];
//           const result = await client.query(updateVariantsQuery, values);
//           console.log('updated variants', result.rows[0]);
//           variannt_ids.push(result.rows[0].id);
//         }
//         const updateInventoryQuery = `UPDATE inventory SET quantity=$1 WHERE productvariant_id=$2 RETURNING *`;
//         for (let i = 0; i < variannt_ids.length; i++) {
//           const inventoryValues = [variants.edited[i].stock, variannt_ids[i]];
//           await client.query(updateInventoryQuery, inventoryValues);
//         }
//         await client.query('COMMIT');
//         return SendResponse(res, 200, true, 'Product updated successfully');
//       } catch (e) {
//         console.log(e);
//         await client.query('ROLLBACK');
//       } finally {
//         client.release();
//       }
//     } else {
//       console.log('Nothing to update or add');
//     }
//   } else {
//     if (count === 1 && productUpdated) {
//       console.log('Only product update request dont need transaction');
//       const updateFieldKeys = Object.keys(product);
//       const updateFieldValue = Object.values(product);

//       const query = `UPDATE products
//       SET ${updateFieldKeys.map((key, index) => `${key}=$${index + 1}`).join(', ')}
//       WHERE id=$${updateFieldKeys.length + 1}
//       RETURNING *`;

//       const data = await pool.query(query, [...updateFieldValue, productid]);

//       console.log(data.rows[0]);

//       console.log(updateFieldValue);
//     } else if (count === 1 && deletedProductId) {
//       console.log('Single varaint deletion request dont need transaction');
//       for (const var_id of variants.deleted) {
//         console.log('Deleting variant _id', var_id);
//         await productService.deleteProdcutVariant(var_id.variant_id);
//       }
//     }
//   }

//   return SendResponse(res, 200, true, 'Update API works', req.body);
// });
const updateProductDetails = asyncHandler(async (req: Request, res: Response) => {
  const { productid, product, variants } = req.body;
  console.log(req.body);
  if (!productid || !product || !variants) {
    return SendErrorResponse(res, 400, false, 'Provide all required fields');
  }
  const generalInfo = Object.keys(product).length > 0;
  const deletedVariants = variants.deleted.length > 0;
  const updatedVariants = variants.edited.length > 0;
  const addedVaraints = variants.newAdded.length > 0;
  const transactionNeeded = deletedVariants || updatedVariants || addedVaraints;
  console.log('transactionNeeded', transactionNeeded);
  const client = transactionNeeded ? await pool.connect() : null;
  try {
    if (client) {
      await client.query('BEGIN');
    }
    if (generalInfo) {
      console.log('hello');
      await generalProductDetail(client || pool, productid, product);
    }
    if (deletedVariants) {
      console.log('delete');
      await deleteVaraints(client || pool, variants.deleted);
    }
    if (updatedVariants) {
      console.log('update');
      await updateVaraints(client || pool, productid, variants.edited);
    }
    if (addedVaraints) {
      console.log('add');
      await addVaraints(client || pool, productid, variants.newAdded);
    }
    if (client) {
      await client.query('COMMIT');
    }
    return SendResponse(res, 200, true, 'Product updated successfully');
  } catch (e) {
    if (client) client.query('ROLLBACK');
    SendErrorResponse(res, 500, false, 'Something went wrong', e);
  } finally {
    if (client) {
      client.release();
    }
  }
});
const getProductClient = asyncHandler(async (req: Request, res: Response) => {
  const { category, subcategory, price } = req.query;

  let index = 1;
  const condition = [];
  const values = [];
  let orderQuery = 'created_at desc';

  if (category) {
    condition.push(`c.id=$${index++}`);
    values.push(category);
  }
  if (subcategory) {
    condition.push(`sc.id=$${index++}`);
    values.push(subcategory);
  }
  if (price) {
    if (price === 'low') {
      orderQuery = `price asc`;
    } else if (price === 'high') {
      orderQuery = `price desc`;
    }
  }

  const whereClause = condition.length > 0 ? `where ` + condition.join(' and ') : '';

  const query = `select p.id,p.name,p.description,p.price,p.base_price

  from products p join subcategories sc
  on p.subcategory_id=sc.id join categories c
  on c.id=sc.category_id ${whereClause} order by ${orderQuery}`;
  console.log(query);
  const products = await pool.query(query, values);
  return SendResponse(res, 200, true, 'Product fetched successfully', products.rows);
});
const productDetailsClient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(typeof id);
  if (!id) {
    return SendErrorResponse(res, 400, false, 'Required Id');
  }
  const productQuery = `SELECT * FROM products WHERE id=$1`;

  const product = await pool.query(productQuery, [id]);
  console.log(product.rows[0]);

  if (!product) {
    return SendErrorResponse(res, 404, false, 'No porduct available');
  }
  const variantsQuery = `select pv.id as variant_id,c.name as color,c.id as color_id ,s.name as size,s.id as size_id,i.quantity as stocks from productvariants pv join colors c on pv.color_id=c.id
join sizes s on pv.size_id=s.id
join inventory i on  pv.id=i.productvariant_id
where pv.product_id=$1`;
  const variants = await pool.query(variantsQuery, [id]);
  console.log(variants.rows);
  const fromattedVariants = variants.rows.map((v) => ({
    variant_id: v.variant_id,
    color: {
      id: v.color_id,
      name: v.color,
    },
    size: {
      id: v.size_id,
      name: v.size,
    },
    stocks: v.stocks,
  }));
  console.log(fromattedVariants);
  return SendResponse(res, 200, true, 'Product Fetched Successfully', {
    product: product.rows[0],
    variants: fromattedVariants,
  });
});

export {
  createProduct,
  getProducts,
  getFilteredProducts,
  getProductById,
  deleteProduct,
  deleteproductvariants,
  productvariant,
  updateProductDetails,
  getProductClient,
  productDetailsClient,
};
