import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { getAllPostsByUser } from "../../api/Post/postApi";
import { IPostData } from "../../../@types";

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

  it("deve buscar todos os posts de um usuário específico com sucesso", async () => {
    const token = "test-token";
    const userId = "1";
    const posts: IPostData[] = [
      {
        id: "1",
        text: "Post do usuário 1",
        authorId: "1",
        author: {
          id: "1",
          name: "Autor 1",
          image: "https://example.com/avatar1.jpg",
        },
        likes: 0,
        comments: [],
        createdAt: "",
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
        likes: 0,
        comments: [],
        createdAt: "",
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
        likes: 0,
        comments: [],
        createdAt: "",
      },
    ];

    mock.onGet("/posts").reply(200, posts);

    const result = await getAllPostsByUser(userId, token);

    const expectedPosts = posts.filter((post) => post.authorId === userId);

    expect(result).toEqual(expectedPosts);
  });

  it("deve lidar com erros", async () => {
    const token = "test-token";
    const userId = "1";

    mock.onGet("/posts").reply(500);

    await expect(getAllPostsByUser(userId, token)).rejects.toThrow();
  });
});
