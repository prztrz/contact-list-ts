import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
// eslint-disable-next-line import/first
import apiData from "../api";

jest.mock("../api.ts", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockApiData: jest.Mock = apiData as any;

const MOCK_DATA = [
  {
    id: "1",
    jobTitle: "Fabricator",
    emailAddress: "Ron_Giles3711@dionrab.com",
    firstNameLastName: "Ron Giles"
  },
  {
    id: "2",
    jobTitle: "IT Support Staff",
    emailAddress: "Melinda_Mcgregor7556@mafthy.com",
    firstNameLastName: "Melinda Mcgregor"
  },
  {
    id: "3",
    jobTitle: "Call Center Representative",
    emailAddress: "Wade_Steer2239@cispeto.com",
    firstNameLastName: "Wade Steer"
  },
  {
    id: "4",
    jobTitle: "Budget Analyst",
    emailAddress: "Alexander_Woodley4471@infotech44.tech",
    firstNameLastName: "Alexander Woodley"
  },
  {
    id: "5",
    jobTitle: "Budget Analyst",
    emailAddress: "Piper_Coll1818@twace.org",
    firstNameLastName: "Piper Coll"
  }
];

const consoleErrSpy = jest.spyOn(console, "error");

beforeEach(() => {
  mockApiData.mockReset();
});

afterAll(() => {
  consoleErrSpy.mockRestore();
});

describe("App", () => {
  it("loads data on mount", async () => {
    mockApiData.mockImplementation(() => Promise.resolve(MOCK_DATA));

    const { getByTestId, findByTestId } = render(<App />);

    expect(getByTestId("loader")).toBeInTheDocument();

    expect(await findByTestId("people-list")).toBeInTheDocument();
  });

  it("handles contact clicks", async () => {
    mockApiData.mockImplementation(() => Promise.resolve(MOCK_DATA));

    const { findByTestId, getAllByTestId, getByTestId, getByText } = render(
      <App />
    );

    await findByTestId("people-list");

    expect(getAllByTestId(/[1-5]/)[0]).toHaveAttribute("data-testid", "1");
    expect(getByText("Selected contacts: 0")).toBeInTheDocument();

    // select  5th element - check reorder and counter
    fireEvent.click(getByTestId("5"));
    expect(getAllByTestId(/[1-5]/)[0]).toHaveAttribute("data-testid", "5");
    expect(getByText("Selected contacts: 1")).toBeInTheDocument();

    // deselect  5th element - check reorder and counter
    fireEvent.click(getByTestId("5"));
    expect(getAllByTestId(/[1-5]/)[0]).toHaveAttribute("data-testid", "1");
    expect(getByText("Selected contacts: 0")).toBeInTheDocument();
  });

  it("handles error state and allows data refetch", async () => {
    mockApiData.mockImplementationOnce(() => Promise.reject());
    // don't log expected error to console
    consoleErrSpy.mockImplementationOnce(() => {});
    const { findByTestId, getByText } = render(<App />);

    expect(await findByTestId("error-alert")).toBeInTheDocument();

    mockApiData.mockImplementationOnce(() => Promise.resolve(MOCK_DATA));

    fireEvent.click(getByText("Try again"));
    expect(await findByTestId("people-list")).toBeInTheDocument();
  });
});
