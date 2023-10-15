import pactum from "pactum";

describe("Получение постов", () => {
  test("Ожидаем статус ответа HTTP запроса 200", async () => {
    await pactum
      .spec()
      .get("https://jsonplaceholder.typicode.com/posts")
      .expectStatus(200);
  });
});
