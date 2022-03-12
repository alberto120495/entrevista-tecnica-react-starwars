import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

describe("Star Wars APP", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  /*
  it("Debe mostrar una lista de caracteres incluyendo Luke Skywalker", () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("Debe mostrar una lista de caracteres desde un archivo JSON", () => {
    render(<App />);
    for (const character of data.results) {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    }
  });
  */

  it("Debe mostrar una lista de caracteres desde una llamada a la api", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });
    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/");

    for (const character of data.results) {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    }
  });

  it("Debe mostrar una mensaje de error cuando la API no esta disponible", async () => {
    window.fetch.mockRejectedValueOnce(new Error("Network error"));
    render(<App />);
    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
