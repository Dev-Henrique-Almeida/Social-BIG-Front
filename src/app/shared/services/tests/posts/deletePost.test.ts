import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { deletePost } from "../../api/Post/postApi";

describe("Testando a função deletePost", () => {
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

  it("deve deletar um post e retornar a mensagem de sucesso", async () => {
    const token = "test-token";
    const postId = "12345";
    const mockResponse = { message: "Post deleted!" };

    mock
      .onDelete(`/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(200, mockResponse);

    const result = await deletePost(postId, token);

    expect(result).toEqual(mockResponse.message);
  });

  it("deve lidar com erros ao deletar um post", async () => {
    const token = "test-token";
    const postId = "12345";

    mock
      .onDelete(`/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(500);

    await expect(deletePost(postId, token)).rejects.toThrow();
  });
});
