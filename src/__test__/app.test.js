import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom/extend-expect';

test('renders Header', () => {
    render(<App />);
    const linkElement = screen.getByText(/Resty/i);
    expect(linkElement).toBeInTheDocument();
  });

it("test if text Request_Method", () => {
  render(<App />);
  const linkElement = screen.getByTestId("Request_Method");
  expect(linkElement.textContent).toEqual("Request Method: ");
});

it("test if elements exist", async () => {
  render(<App />);
  const submitBtn = screen.getByTestId("submitBtn").textContent;
  const getSpan = screen.getByTestId("get").textContent;
  const url = screen.getByTestId("url").textContent;

  expect(submitBtn).toEqual("GO!");
  expect(getSpan).toEqual("GET");
  expect(url).toEqual("URL: ");


});
describe('Footer Component', () => {
    it('should render the footer text', () => {
      render(<App />);
      expect(screen.getByText('© 2018')).toBeInTheDocument();
    });
  });