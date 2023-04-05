import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import CatalogItem from './CatalogItem';
import * as ratingService from '../../services/ratingServices';

jest.mock('../../services/ratingServices');

describe('CatalogItem component', () => {
  const car = {
    id: 1,
    make: 'Tesla',
    model: 'Model S',
    makeYear: 2021,
    categoryName: 'Luxury',
    imageUrl: 'https://example.com/car.jpg',
  };

  const ratings = [
    { id: 1, carId: 1, rate: 4 },
    { id: 2, carId: 1, rate: 5 },
  ];

  beforeEach(() => {
    ratingService.getAllRatingsByCar.mockResolvedValue(ratings);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the car details and rating', async () => {
    await act(async () => {
    render(
      <BrowserRouter>
        <CatalogItem car={car} />
      </BrowserRouter>
    );
    });

    expect(screen.getByAltText('car')).toHaveAttribute('src', car.imageUrl);
    expect(screen.getByText(`${car.make} ${car.model} ${car.makeYear}`)).toBeInTheDocument();
    expect(screen.getByText(`Category: ${car.categoryName}`)).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.getByText(`Rating: 4.50`)).toBeInTheDocument();
      });
  });

  test('renders the default rating when there are no ratings', async () => {
    await act(async () => {
    ratingService.getAllRatingsByCar.mockResolvedValue([]);

    render(
      <BrowserRouter>
        <CatalogItem car={car} />
      </BrowserRouter>
    );
  });

    expect(screen.getByText('Rating: 0')).toBeInTheDocument();
  });

  test('calls ratingService.getAllRatingsByCar with the correct car id', async () => {
    await act(async () => {
    render(
      <BrowserRouter>
        <CatalogItem car={car} />
      </BrowserRouter>
    );
    });

    expect(ratingService.getAllRatingsByCar).toHaveBeenCalledWith(car.id);
  });

  test('navigates to the car details page when the details button is clicked', async () => {
    await act(async () => {
    render(
      <BrowserRouter>
        <CatalogItem car={car} />
      </BrowserRouter>
    );
    });
    const detailsButton = screen.getByText('Details');

    userEvent.click(detailsButton);

    expect(global.window.location.pathname).toContain(`/catalog/${car.id}`);
  });
});
