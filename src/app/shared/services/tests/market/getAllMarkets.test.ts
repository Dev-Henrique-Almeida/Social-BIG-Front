import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { getAllMarket } from "../../api/Market/marketApi";

describe("Testando a função getAllMarkets", () => {
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

  it("deve buscar todos os items do marketplace com sucesso", async () => {
    const token = "test-token";
    const users = [
      {
        id: 1,
        name: "aaa",
        description: "asdasd",
        price: 10,
        image: null,
        vendido: false,
        sellerId: "8671190e-1521-49de-bd52-bf2326e026c0",
      },
    ];

    mock
      .onGet("/market", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(200, users);

    const result = await getAllMarket(token);

    expect(result).toEqual(users);
  });

  it("deve lidar com erros", async () => {
    const token = "test-token";

    mock
      .onGet("/market", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(500);

    await expect(getAllMarket(token)).rejects.toThrow();
  });
});
