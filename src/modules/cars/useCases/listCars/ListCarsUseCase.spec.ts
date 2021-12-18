import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import ListCarsUseCase from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car =  await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Fusca é um carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5cc70bf8-5c91-49d9-8e10-1bdfda843557",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car =  await carsRepositoryInMemory.create({
        name: "Uno",
        description: "Uno é um carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1235",
        fine_amount: 10,
        brand: "Fiat",
        category_id: "5cc70bf8-5c91-49d9-8e10-1bdfda843557",
      });
  
      const cars = await listCarsUseCase.execute({
          brand: "Fiat",
      });
        
      expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by name", async () => {
    const car =  await carsRepositoryInMemory.create({
        name: "Kombi",
        description: "Kombi é um carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1236",
        fine_amount: 10,
        brand: "Fiat",
        category_id: "5cc70bf8-5c91-49d9-8e10-1bdfda843557",
      });
  
      const cars = await listCarsUseCase.execute({
          name: "Kombi",
      });
        
      expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by category_id", async () => {
    const car =  await carsRepositoryInMemory.create({
        name: "Del rey",
        description: "Del rey é um carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1236",
        fine_amount: 10,
        brand: "Fiat",
        category_id: "5cc70bf8-5c91-49d9-8e10-1bdfda843558",
      });
  
      const cars = await listCarsUseCase.execute({
          category_id: "5cc70bf8-5c91-49d9-8e10-1bdfda843558",
      });
        
      expect(cars).toEqual([car]);
  })
});
