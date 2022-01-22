import app from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("123456", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) VALUES ('${id}', 'Admin', 'admin@admin.com.br', '${password}','XXXX', true, NOW())`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should list all categories", async () => {
    const {
      body: { token },
    } = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "123456",
    });

    await request(app)
      .post("/categories")
      .send({
        name: "categoria supertest",
        description: "descrição da categoria",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
  });
});
