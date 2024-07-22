import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { IPostData } from "../../../@types";
import { likePost } from "../../api/Post/postApi";

describe("likePost", () => {
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

  it("deve dar like em um post e retornar os dados atualizados do post", async () => {
    const postId = "dd73f6dd-942f-4f46-ad09-080aeff23fc6";
    const token = "test-token";
    const userId = "080aeff23fc6";
    const mockResponse: IPostData = {
      id: postId,
      text: "Texto do post",
      location: "Localização",
      likes: 1,
      image: "null",
      authorId: userId,
      createdAt: new Date().toISOString(),
      author: {
        id: userId,
        name: "Author Name",
        image: "https://example.com/avatar.jpg",
      },
      comments: [],
    };

    mock.onPatch(`/posts/like/${postId}`, { userId }).reply(200, mockResponse);

    const result = await likePost(postId, token, userId);

    expect(result).toEqual(mockResponse);
  });

  it("deve tirar o like de um post e retornar os dados atualizados do post", async () => {
    const postId = "dd73f6dd-942f-4f46-ad09-080aeff23fc6";
    const token = "test-token";
    const userId = "080aeff23fc6";
    const mockResponse: IPostData = {
      id: postId,
      text: "Texto do post",
      location: "Localização",
      likes: 0,
      image: "null",
      authorId: userId,
      createdAt: new Date().toISOString(),
      author: {
        id: userId,
        name: "Author Name",
        image: "https://example.com/avatar.jpg",
      },
      comments: [],
    };

    mock.onPatch(`/posts/like/${postId}`, { userId }).reply(200, mockResponse);

    const result = await likePost(postId, token, userId);

    expect(result).toEqual(mockResponse);
  });

  it("deve lidar com erros ao dar like em um post", async () => {
    const postId = "dd73f6dd-942f-4f46-ad09-080aeff23fc6";
    const token = "test-token";
    const userId = "080aeff23fc6";

    mock.onPatch(`/posts/like/${postId}`, { userId }).reply(500);

    await expect(likePost(postId, token, userId)).rejects.toThrow();
  });

  it("deve lidar com erros ao tirar o like de um post", async () => {
    const postId = "dd73f6dd-942f-4f46-ad09-080aeff23fc6";
    const token = "test-token";
    const userId = "080aeff23fc6";

    mock.onPatch(`/posts/like/${postId}`, { userId }).reply(500);

    await expect(likePost(postId, token, userId)).rejects.toThrow();
  });
});
