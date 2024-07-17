import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { getAllPosts } from "../../api/postApi";

describe("Testando a função getAllPosts", () => {
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

  it("deve buscar todos os posts com sucesso", async () => {
    const token = "test-token";
    const users = [
      {
        id: 1,
        text: "Testando 1",
        authorId: "1",
        author: {
          id: "1",
          name: "Author 1",
          image: "https://example.com/avatar1.jpg",
        },
        location: "a",
        likes: "0",
        image: "a",
        comments: [],
      },
      {
        id: 2,
        text: "Testando 2",
        authorId: "2",
        author: {
          id: "2",
          name: "Author 2",
          image: "https://example.com/avatar1.jpg",
        },
        location: "b",
        likes: "0",
        image: "b",
        comments: [],
      },
    ];

    mock
      .onGet("/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(200, users);

    const result = await getAllPosts(token);

    expect(result).toEqual(users);
  });

  it("deve lidar com erros", async () => {
    const token = "test-token";

    mock
      .onGet("/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(500);

    await expect(getAllPosts(token)).rejects.toThrow();
  });
});
