export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    imageUrl: { type: 'string' },
    count: { type: 'number' },
  },
  required: ['title', 'description', 'price', 'imageUrl', 'count']
} as const;