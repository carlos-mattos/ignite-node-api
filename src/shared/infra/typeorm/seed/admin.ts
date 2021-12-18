import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";
import 'reflect-metadata'

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("123456", 8);

  await connection.query(
    `INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) VALUES ('${id}', 'Admin', 'admin@admin.com.br', '${password}','XXXX', true, NOW())`
  );

  await connection.close()
}

create().then(() => console.log("User admin created!"));
