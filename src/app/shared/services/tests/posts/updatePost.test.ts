import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { IPostData, IPostCreateData } from "../../../@types";
import { updatePost, createPost } from "../../api/Post/postApi";

describe("updatePost", () => {
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

  it("deve criar um post, atualizar o post e retornar os dados atualizados do post", async () => {
    const postId = "f9a9ad10-d696-41b9-9e29-f5e48";
    const token = "test-token";
    const postCreateData: IPostCreateData = {
      text: "POST ORIGINAL",
      location: "Localização",
      image: "https://example.com/image.jpg",
      authorId: "author-id",
    };
    const postData: IPostData = {
      ...postCreateData,
      id: postId,
      likes: 0,
      createdAt: new Date().toISOString(),
      author: {
        id: "author-id",
        name: "Author Name",
        image: "https://example.com/avatar.jpg",
      },
      comments: [],
    };

    const updatedPostData: IPostData = {
      ...postData,
      text: "TESTANDO UPDATE",
    };

    mock.onPost("/posts", postCreateData).reply(200, postData);

    mock.onPut(`/posts/${postId}`, updatedPostData).reply(200, updatedPostData);

    const createdPost = await createPost(postCreateData, token);
    expect(createdPost).toEqual(postData);

    const result = await updatePost(updatedPostData, postId, token);
    expect(result).toEqual(updatedPostData);
  });

  it("deve lidar com erros ao atualizar um post", async () => {
    const postId = "f9a9ad10-d696-41b9-9e29-f5e48";
    const token = "test-token";
    const postData: IPostData = {
      id: postId,
      text: "TESTANDO UPDATE",
      location: "",
      likes: 0,
      image: "",
      authorId: "author-id",
      createdAt: new Date().toISOString(),
      author: {
        id: "author-id",
        name: "Author Name",
        image: "https://example.com/avatar.jpg",
      },
      comments: [],
    };

    mock.onPut(`/posts/${postId}`, postData).reply(500);

    await expect(updatePost(postData, postId, token)).rejects.toThrow();
  });
});
