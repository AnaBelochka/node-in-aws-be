import { main as getProductsList } from "@functions/getProductsList/handler";

describe("getProductsList function", () => {
  it('should return products', async () => {
    const expectedResult = [
      {
        "count": 6,
        "description": "In Assassin's Creed® Valhalla, become Eivor, a legendary Viking warrior on a quest for glory. Explore England's Dark Ages as you raid your enemies, grow your settlement, and build your political power.",
        "price": 10,
        "title": "Assassins creed: Valhalla",
        "imageUrl": "https://pstationblog.ru/wp-content/uploads/2020/08/assassins-creed-valhalla.jpg",
        "id": "game-1",
      },
    ];
    const mockedGetProductsListMockReturnFromDB = jest.fn().mockReturnValue(expectedResult);

    jest.mock("../mocks/mocked-functions", () => mockedGetProductsListMockReturnFromDB);

    const result = await getProductsList({}, null);

    expect(result).toEqual(expectedResult);
  });

  it('should return error if products not found', async () => {
    const expectedResult = {
      message: "Products not found"
    }
    const mockedGetProductsListMockReturnFromDB = jest.fn().mockReturnValue(expectedResult);

    jest.mock("../mocks/mocked-functions", () => mockedGetProductsListMockReturnFromDB);

    const result = await getProductsList({}, null);

    expect(result).toEqual(expectedResult);
  });
})

