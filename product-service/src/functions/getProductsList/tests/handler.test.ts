import { main as getProductsList } from "@functions/getProductsList/handler";
import * as functionsToMock from "../../mocks/mocked-functions";
import * as formatJSONResponseToMock from "@libs/api-gateway";

describe("getProductsList function", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return products', async () => {
    const products = [
      {
        "count": 6,
        "description": "In Assassin's Creed® Valhalla, become Eivor, a legendary Viking warrior on a quest for glory. Explore England's Dark Ages as you raid your enemies, grow your settlement, and build your political power.",
        "price": 10,
        "title": "Assassins creed: Valhalla",
        "imageUrl": "https://pstationblog.ru/wp-content/uploads/2020/08/assassins-creed-valhalla.jpg",
        "id": "game-1",
      },
    ];
    const expectedResult = {
      body: {
        products: JSON.stringify(products),
      },
      statusCode: 200,
      "headers": {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const getProductsByIdMockReturnFromDBSpy = jest.spyOn(functionsToMock, "getProductsListMockReturnFromDB").mockResolvedValueOnce(products);
    const formatJSONResponseSpy = jest.spyOn(formatJSONResponseToMock, "formatJSONResponse").mockResolvedValueOnce(expectedResult);

    const result = await getProductsList({}, null);

    expect(result).toEqual(expectedResult);
    expect(getProductsByIdMockReturnFromDBSpy).toHaveBeenCalled();
    expect(formatJSONResponseSpy).toHaveBeenCalled();
  });

  it('should return error id products not fopund', async () => {
    const expectedResult = {
      body: {
        message: "Products not found"
      },
      statusCode: 404,
      "headers": {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const getProductsListMockReturnFromDBSpy = jest.spyOn(functionsToMock, "getProductsListMockReturnFromDB").mockResolvedValueOnce(null);
    const formatJSONResponseSpy = jest.spyOn(formatJSONResponseToMock, "formatJSONResponse").mockResolvedValueOnce(expectedResult);

    const result = await getProductsList({}, null);

    expect(result).toEqual(expectedResult);
    expect(getProductsListMockReturnFromDBSpy).toHaveBeenCalled();
    expect(formatJSONResponseSpy).toHaveBeenCalled();
  });
})

