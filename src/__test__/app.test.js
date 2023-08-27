import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom/extend-expect';


import { server } from '../mocks/server'

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

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
describe('Api Mock Test', () => {
  test('submits the form and fetches Pokemons', async () => {
    // const { getByLabelText, getByTestId } = renderWithProviders(<App />);
    render(<App />);
    const urlInput = screen.getByLabelText('URL:');
    const submitButton = screen.getByTestId('submitBtn');

    fireEvent.change(urlInput, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    fireEvent.click(submitButton);

    // Wait for the API call to complete (assuming it triggers the fetch)
    await waitFor(async () => {
      const countDiv = screen.getByTestId('testing-count');
      const sectionDiv = screen.getByTestId('section-of-data');
      const countContent = countDiv.textContent;
      const sectionDivContent = sectionDiv.textContent

      console.log(sectionDivContent)
      // console.log("Hasan TOmaaaaaaaaaaaaaaaaaaaaaaaaaaaaalieh",countContent)
      // Check if the expected content is present in the countDiv
      expect(countContent).toEqual('Count: 1281');

      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(sectionDivContent).toContain('"name": "bulbasaur"');
    });
  });
});