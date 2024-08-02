import MockAdapter from "axios-mock-adapter";
import { IMarketCreateData } from "../../../@types";
import { api } from "../../api/api";
import { createMarket } from "../../api/Market/marketApi";

describe("createMarket", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("deve criar um item no market", async () => {
    const token = "test-token";
    const marketCreateData: IMarketCreateData = {
      name: "Market",
      description: "Market",
      image: "https://example.com/image.jpg",
      sellerId: "seller-id",
      price: 100,
    };

    const mockResponse = { ...marketCreateData, id: "new-id" };

    mock.onPost("/market", marketCreateData).reply(200, mockResponse);

    const result = await createMarket(marketCreateData, token);

    expect(result).toEqual(mockResponse);
  });

  it("deve lidar com erros ao criar um market", async () => {
    const token = "test-token";
    const marketCreateData: IMarketCreateData = {
      name: "Market",
      description: "Market",
      image: "https://example.com/image.jpg",
      sellerId: "seller-id",
      price: 100,
    };

    mock.onPost("/market", marketCreateData).reply(500);

    await expect(createMarket(marketCreateData, token)).rejects.toThrow();
  });
});
