export const getAllProductsQueryTemplate = `select p.id, p.title, p.description, p.price, p.imageurl, s.count from products p inner join stock s on p.id = s.product_id`;
export const createProductQueryTemplate = `insert into products (title, description, price, imageUrl) values`;
export const createStockQueryTemplate = `insert into stock (product_id, count) values`;