import MockAdapter from "axios-mock-adapter";
import { getAllUsers } from "../api/userApi";
import { api } from "../api/api";

describe("Testando a função getAllUsers", () => {
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

  it("deve buscar todos os usuários com sucesso", async () => {
    const token = "test-token";
    const users = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];

    mock
      .onGet("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(200, users);

    const result = await getAllUsers(token);

    expect(result).toEqual(users);
  });

  it("deve lidar com erros", async () => {
    const token = "test-token";

    mock
      .onGet("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(500);

    await expect(getAllUsers(token)).rejects.toThrow();
  });
});
