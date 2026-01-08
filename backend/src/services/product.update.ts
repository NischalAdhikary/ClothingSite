import { Pool, PoolClient } from 'pg';

export async function addVaraints(db: Pool | PoolClient, productid: string, variants: any[]) {
  const addProductVariantQuery = `INSERT INTO productvariants (product_id,color_id,size_id) VALUES ($1,$2,$3 ) RETURNING id`;
  const variant_ids = [];

  for (const v of variants) {
    const values = [productid, v.color_id, v.size_id];
    const result = await db.query(addProductVariantQuery, values);
    variant_ids.push(result.rows[0].id);
  }
  const addInventoryQuery = `INSERT INTO inventory (productvariant_id,quantity) VALUES ($1,$2)`;
  for (let i = 0; i < variant_ids.length; i++) {
    const inventoryValues = [variant_ids[i], variants[i].stock];
    await db.query(addInventoryQuery, inventoryValues);
  }
}
export async function updateVaraints(db: Pool | PoolClient, productid: string, variants: any[]) {
  console.log(productid, variants);
  const updateVariantsQuery = `UPDATE productvariants SET product_id=$1,color_id=$2,size_id=$3 WHERE id=$4 RETURNING *`;
  const variannt_ids = [];
  for (const v of variants) {
    const values = [productid, v.color_id, v.size_id, v.variant_id];
    const result = await db.query(updateVariantsQuery, values);
    console.log('updated variants', result.rows[0]);
    variannt_ids.push(result.rows[0].id);
  }
  const updateInventoryQuery = `UPDATE inventory SET quantity=$1 WHERE productvariant_id=$2 RETURNING *`;
  for (let i = 0; i < variannt_ids.length; i++) {
    const inventoryValues = [variants[i].stock, variannt_ids[i]];
    await db.query(updateInventoryQuery, inventoryValues);
  }
}
export async function deleteVaraints(db: Pool | PoolClient, variants: any[]) {
  console.log('variants from delete', variants);
  const deleteVarintQuery = `DELETE FROM productvariants WHERE id=$1 RETURNING *`;
  for (const v of variants) {
    const values = [v.variant_id];
    console.log('values', values);
    await db.query(deleteVarintQuery, values);
    console.log('hii');
  }
}
export async function generalProductDetail(
  db: Pool | PoolClient,
  productid: string,
  product: any[],
) {
  const updateFieldKeys = Object.keys(product);
  const updateFieldValue = Object.values(product);

  const query = `UPDATE products
      SET ${updateFieldKeys.map((key, index) => `${key}=$${index + 1}`).join(', ')}
      WHERE id=$${updateFieldKeys.length + 1}
      RETURNING *`;
  await db.query(query, [...updateFieldValue, productid]);
}
