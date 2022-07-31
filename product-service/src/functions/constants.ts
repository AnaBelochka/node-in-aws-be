export const getAllProductsQueryTemplate = `select p.id, p.title, p.description, p.price, s.count from products p inner join stock s on p.id = s.product_id`;
export const createProductQueryTemplate = `insert into products (title, description, price) values ($1, $2, $3) RETURNING id`;
export const createStockQueryTemplate = `insert into stock (product_id, count) values ($1, $2)`;