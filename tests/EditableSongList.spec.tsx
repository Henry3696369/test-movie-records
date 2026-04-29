import { render, screen, fireEvent } from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";

describe("EditableSongList Component", () => {
    const mockSongs: string[] = ["Song One", "Song Two"];
    const mockSetSongs = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Check song display", () => {
        render(<EditableSongList songs={mockSongs} setSongs={mockSetSongs} />);
        expect(screen.getByDisplayValue("Song One")).toBeInTheDocument();
    });

    test("CLck deletebutton", () => {
        render(<EditableSongList songs={mockSongs} setSongs={mockSetSongs} />);

        const deleteButtons = screen.getAllByRole("button", { name: /❌/i });
        fireEvent.click(deleteButtons[1]);

        expect(mockSetSongs).toHaveBeenCalledWith([mockSongs[0]]);
    });

    test("CLck deletebutton", () => {
        render(<EditableSongList songs={mockSongs} setSongs={mockSetSongs} />);

        const inputs = screen.getAllByRole("textbox");
        const firstInput = inputs[0];
        fireEvent.change(firstInput, { target: { value: "cool song" } });
        expect(mockSetSongs).toHaveBeenCalledWith(["cool song", "Song Two"]);
    });
});
