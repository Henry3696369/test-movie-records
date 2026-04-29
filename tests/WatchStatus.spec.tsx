import { render, screen } from "@testing-library/react";
import { WatchStatus } from "../src/components/WatchStatus";

describe("WatchStatus component", () => {
    const seenWatchStatus = {
        seen: false,
        liked: false,
        when: null,
    };
    it("Renders the seen watch status", () => {
        render(
            <WatchStatus
                watched={{
                    seen: true,
                    liked: false,
                    when: null,
                }}
            ></WatchStatus>,
        );
        const watchedText = screen.getByText(/Watched/);
        expect(watchedText).toBeInTheDocument();
    });
    it("Renders the unseen watch status", () => {
        render(<WatchStatus watched={seenWatchStatus}></WatchStatus>);
        const watchedText = screen.queryByText(/Watched/);
        expect(watchedText).not.toBeInTheDocument();
    });
    it("Renders the watch status", () => {
        render(
            <WatchStatus
                watched={{
                    seen: false,
                    liked: false,
                    when: null,
                }}
            ></WatchStatus>,
        );
        const watchedText = screen.getByText(/Not yet watched/i);
        expect(watchedText).toBeInTheDocument();
    });
});
