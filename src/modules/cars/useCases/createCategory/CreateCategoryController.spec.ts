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
    const password = await hash("mudousenha", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) VALUES ('${id}', 'Admin', 'admin@admin.com.br', '${password}','XXXX', true, NOW())`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should create a new category", async () => {
    const {
      body: { refresh_token },
    } = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "mudousenha",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "categoria supertest",
        description: "descrição da categoria",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not create a new category when already exists another with same name", async () => {
    const {
      body: { refresh_token },
    } = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "mudousenha",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "categoria supertest",
        description: "descrição da categoria",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
