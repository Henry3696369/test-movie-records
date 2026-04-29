import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });
});

test("Click watchButton", () => {
    render(<App />);
    const watchButton = screen.getAllByText(/Mark as Watched/i)[0];
    fireEvent.click(watchButton);
    const unwatchedButtons = screen.getAllByText(/Mark as Unwatched/i);
    expect(unwatchedButtons.length).toBe(1);
});

test("CLick editButton", () => {
    render(<App />);
    const editButton = screen.getAllByText(/Edit/i)[0];
    fireEvent.click(editButton);
    const modalTitle = screen.getByLabelText(/Title:/i);
    fireEvent.change(modalTitle, { target: { value: "Inception" } });
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);
    const updatedTitle = screen.getByText(/Inception/i);
    expect(updatedTitle).toBeInTheDocument();
});

test("CLick deleteButton", () => {
    render(<App />);
    const editButton = screen.getAllByText(/Edit/i)[0];
    fireEvent.click(editButton);
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
    const disappearedTitle = screen.queryByText(/Kiki's Delivery Service/i);
    expect(disappearedTitle).not.toBeInTheDocument();
});

test("CLick addButton", () => {
    render(<App />);
    const addButton = screen.getByText(/add new movie/i);
    fireEvent.click(addButton);
    const movieslists = screen.getAllByText(/edit/i);
    const youtubebox = screen.getByLabelText(/youtube id:/i);
    fireEvent.change(youtubebox, { target: { value: "asadasd" } });
    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);
    const new_movieslists = screen.getAllByText(/edit/i);
    expect(new_movieslists.length).toBe(movieslists.length + 1);
});

test("click liked button", () => {
    render(<App />);
    const watchButton = screen.getAllByText(/Mark as Watched/i)[0];
    fireEvent.click(watchButton);
    const likeButton = screen.getAllByText(/not liked/i)[0];
    fireEvent.click(likeButton);
    const update1 = screen.getByText(/liked/i);
    expect(update1).toBeInTheDocument();
});

test("Add song", async () => {
    render(<App />);
    const addnewmovieButton = screen.getByRole("button", {
        name: /add new movie/i,
    });
    fireEvent.click(addnewmovieButton);
    const addsongButton = await screen.findByRole("button", {
        name: /add song/i,
    });
    fireEvent.click(addsongButton);
    await waitFor(() => {
        const update1 = screen.getByText("❌");
        expect(update1).toBeInTheDocument();
    });
});
