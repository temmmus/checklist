import { render, cleanup, within, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import App from "@/App.vue";

describe("App component", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  describe("Component rendering", () => {
    it("Render Header component", () => {
      const { getByRole } = render(App);

      const header = getByRole("banner");
      expect(header).toBeInTheDocument();

      const title = getByRole("heading", { level: 1 });
      expect(title).toHaveTextContent(/tod\s?o/i);
      expect(title).toBeInTheDocument();
    });

    it("Render Filters component", () => {
      const { getByTestId, getByRole } = render(App);

      const filters = getByTestId("filters");
      expect(filters).toBeInTheDocument();

      const allButton = getByRole("button", { name: /all/i });
      expect(allButton).toBeInTheDocument();

      const activeButton = getByRole("button", { name: /active/i });
      expect(activeButton).toBeInTheDocument();

      const doneButton = getByRole("button", { name: /done/i });
      expect(doneButton).toBeInTheDocument();
    });

    it("Render AddItem component", () => {
      const { getByTestId, getByRole, getByPlaceholderText } = render(App);

      const addItemAside = getByTestId("add-item");
      expect(addItemAside).toBeInTheDocument();

      const addButton = getByRole("button", { name: /add item button/i });
      expect(addButton).toBeInTheDocument();

      const inputElement = getByPlaceholderText("Add item");
      expect(inputElement).toBeInTheDocument();
    });
  });

  describe("Component functions", () => {
    it("Add new item to the list", async () => {
      const { getByRole, getByDisplayValue } = render(App);

      const addItemInput = getByRole("textbox", { name: /add item input/i });
      const addItemButton = getByRole("button", { name: /add item button/i });

      await fireEvent.update(addItemInput, "New item");
      await fireEvent.click(addItemButton);

      const newItem = getByDisplayValue("New item");
      expect(newItem).toBeInTheDocument();
    });

    it("Remove item from the list", async () => {
      const { getByPlaceholderText, getByRole, getAllByRole, queryByText } = render(App);

      const input = getByPlaceholderText("Add item");
      const addButton = getByRole("button", { name: "add item button" });

      // Убеждаемся, что элемент ещё не добавлен
      expect(queryByText("Test item")).not.toBeInTheDocument();

      // Добавляем новый элемент в список
      await fireEvent.update(input, "Test item");
      await fireEvent.click(addButton);

      // Проверяем, что элемент добавлен в список
      const listItems = getAllByRole("listitem");
      const firstListItem = listItems[0];
      const { queryByRole } = within(firstListItem);
      const itemInput = queryByRole("textbox");
      expect(itemInput).toHaveValue("Test item");

      // Убеждаемся, что кнопка удаления изначально отсутствует
      expect(queryByRole("button", { name: "" })).not.toBeInTheDocument();

      // Эмулируем событие touchstart, чтобы показать кнопку удаления
      await fireEvent.touchStart(itemInput);
      expect(queryByRole("button", { name: "" })).toBeInTheDocument();

      // Нажимаем кнопку удаления
      const itemRemoveButton = queryByRole("button", { name: "" });
      await fireEvent.click(itemRemoveButton);

      // Проверяем, что элемент был удален
      expect(queryByText("Test item")).not.toBeInTheDocument();
    });
  });
});
