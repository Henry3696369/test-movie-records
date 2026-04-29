import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { fireEvent, render, screen } from "@testing-library/react";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn() as jest.Mock<
        (id: string, movie: Movie) => void
    >;
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });

    test("click cancel button", () => {
        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        cancelButton.click();
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("set release year", () => {
        const setyear = screen.getByLabelText(/Release Year:/i);
        fireEvent.change(setyear, { target: { value: "9999" } });
        expect((setyear as HTMLInputElement).value).toBe("9999");
    });

    test("set rating", () => {
        const setrating = screen.getByLabelText(/rating:/i);
        fireEvent.change(setrating, { target: { value: "8" } });
        expect((setrating as HTMLInputElement).value).toBe("8");
    });

    test("set description", () => {
        const setdescription = screen.getByLabelText(/description:/i);
        fireEvent.change(setdescription, { target: { value: "8" } });
        expect((setdescription as HTMLInputElement).value).toBe("8");
    });
    test("save empty input as 0", () => {
        const setyear = screen.getByLabelText(/Release Year:/i);
        const setrating = screen.getByLabelText(/rating:/i);
        fireEvent.change(setrating, { target: { value: "" } });
        fireEvent.change(setyear, { target: { value: "" } });
        const saveButton = screen.getByRole("button", { name: /save/i });
        saveButton.click();
        expect(mockEditMovie).toHaveBeenCalledWith(
            mockMovie.id,
            expect.objectContaining({
                released: 0,
                rating: 0,
            }),
        );
    });
    test("set song name", () => {
        const songname = screen.getByDisplayValue(/test song/i);
        fireEvent.change(songname, { target: { value: "888" } });
        expect((songname as HTMLInputElement).value).toBe("888");
        const saveButton = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveButton);
        expect(mockEditMovie).toHaveBeenCalled();
        const [id, newMovie] = mockEditMovie.mock.calls[0] as [string, Movie];
        expect(id).toBe(mockMovie.id);
        expect(newMovie.soundtrack[0].name).toBe("888");
    });
    test("set song author", () => {
        const songauthor = screen.getByDisplayValue(/test artist/i);
        fireEvent.change(songauthor, { target: { value: "888" } });
        expect((songauthor as HTMLInputElement).value).toBe("888");
        const saveButton = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveButton);
        expect(mockEditMovie).toHaveBeenCalled();
        const [id, newMovie] = mockEditMovie.mock.calls[0] as [string, Movie];
        expect(id).toBe(mockMovie.id);
        expect(newMovie.soundtrack[0].by).toBe("888");
    });
});
