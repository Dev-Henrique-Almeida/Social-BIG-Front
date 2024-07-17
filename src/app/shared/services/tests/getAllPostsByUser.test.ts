import MockAdapter from "axios-mock-adapter";
import { api } from "../api/api";
import { getAllPostsByUser } from "../api/postApi";

describe("Testando a função getAllPostsByUser", () => {
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

  it("deve buscar todos os posts de um usuário específico com sucesso e retornar a quantidade", async () => {
    const token = "test-token";
    const userId = "1";
    const posts = [
      {
        id: "1",
        text: "Post do usuário 1",
        authorId: "1",
        author: {
          id: "1",
          name: "Autor 1",
          image: "https://example.com/avatar1.jpg",
        },
      },
      {
        id: "2",
        text: "Post do usuário 2",
        authorId: "2",
        author: {
          id: "2",
          name: "Autor 2",
          image: "https://example.com/avatar2.jpg",
        },
      },
      {
        id: "3",
        text: "Outro post do usuário 1",
        authorId: "1",
        author: {
          id: "1",
          name: "Autor 1",
          image: "https://example.com/avatar1.jpg",
        },
      },
    ];

    mock
      .onGet("/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(200, posts);

    const result = await getAllPostsByUser(userId, token);

    const expectedPosts = posts.filter((post) => post.authorId === userId);

    console.log("Contagem de posts: ", result.count);
    expect(result).toEqual({
      count: expectedPosts.length,
      posts: expectedPosts,
    });
  });

  it("deve lidar com erros", async () => {
    const token = "test-token";
    const userId = "1";

    mock
      .onGet("/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(500);

    await expect(getAllPostsByUser(userId, token)).rejects.toThrow();
  });
});
