import { main as getProductsById } from "../handler";
import * as functionsToMock from "../../mocks/mocked-functions";
import * as formatJSONResponseToMock from "@libs/api-gateway";

describe("getProductsById function", () => {
  it('should return product if it exists', async () => {
    const id = "game-2";
    const event = {
      pathParameters: {
        productId: id,
      }
    };
    const products = [
      {
        count: 6,
        description: "In Assassin's Creed® Valhalla, become Eivor, a legendary Viking warrior on a quest for glory. Explore England's Dark Ages as you raid your enemies, grow your settlement, and build your political power.",
        price: 10,
        title: "Assassins creed: Valhalla",
        imageUrl: "https://pstationblog.ru/wp-content/uploads/2020/08/assassins-creed-valhalla.jpg",
        id,
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
    const getProductsByIdMockReturnFromDBSpy = jest.spyOn(functionsToMock, "getProductsByIdMockReturnFromDB").mockResolvedValueOnce(products);
    const formatJSONResponseSpy = jest.spyOn(formatJSONResponseToMock, "formatJSONResponse").mockResolvedValueOnce(expectedResult);

    const result = await getProductsById(event, null);

    expect(result).toEqual(expectedResult);
    expect(getProductsByIdMockReturnFromDBSpy).toHaveBeenCalled();
    expect(formatJSONResponseSpy).toHaveBeenCalled();
  });

  it('should return error if products not found', async () => {
    const id = "not-exist";
    const event = {
      pathParameters: {
        productId: id,
      }
    };
    const message = {
      message: "Products not found",
    }
    const expectedResult = {
      body: {
        message,
      },
      statusCode: 404,
      "headers": {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    }
    const getProductsByIdMockReturnFromDBSpy = jest.spyOn(functionsToMock, "getProductsByIdMockReturnFromDB").mockResolvedValueOnce(null);
    const formatJSONResponseSpy = jest.spyOn(formatJSONResponseToMock, "formatJSONResponse").mockResolvedValueOnce(expectedResult);

    const result = await getProductsById(event, null);

    expect(result).toEqual(expectedResult);
    expect(getProductsByIdMockReturnFromDBSpy).toHaveBeenCalled();
    expect(formatJSONResponseSpy).toHaveBeenCalled();
  });
})
