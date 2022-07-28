interface Body {
  title: string;
  description: string;
  price: number;
  count: number;
}

export const checkTypes = (body: Body) => {
  const errorTemplate = "Invalid input parameter";

  if (typeof body.title !== "string") {
    return `${errorTemplate} title`;
  }

  if (typeof body.description !== "string") {
    return `${errorTemplate} description`;
  }

  if (typeof body.count !== "number") {
    return `${errorTemplate} count`;
  }

  if (typeof body.price !== "number") {
    return `${errorTemplate} price`;
  }

  return undefined;
}