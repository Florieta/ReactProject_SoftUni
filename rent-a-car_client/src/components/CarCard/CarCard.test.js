import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CarCard from './CarCard';

const car = {
  id: 1,
  make: 'BMW',
  model: 'X5',
  makeYear: 2019,
  dailyRate: 60,
  categoryName: 'SUV',
  doors: 4,
  seats: 5,
  fuel: 'Diesel',
  transmission: 'Automatic',
  airCondition: true,
  navigationSystem: true,
  regNumber: 'AB1234CD',
  imageUrl: 'https://example.com/car.jpg',
};

describe('CarCard component', () => {
  test('renders car details correctly', () => {
    render(
      <BrowserRouter>
        <CarCard car={car} />
      </BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={{ user: { token: '123', user: { renterId: false } } }}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );
    expect(screen.getByText(`${car.make} ${car.model} ${car.makeYear}`)).toBeInTheDocument();
    expect(screen.getByText(`${car.dailyRate}€ per day`)).toBeInTheDocument();
    expect(screen.getByText(`Category: ${car.categoryName}`)).toBeInTheDocument();
    expect(screen.getByText(`The car has ${car.doors} doors and ${car.seats} seats. The type of fuel is ${car.fuel}.Automatic transmission.`)).toBeInTheDocument();
    expect(screen.getByText(`A/C: Yes`)).toBeInTheDocument();
    expect(screen.getByText(`Navigation system: Yes`)).toBeInTheDocument();
    expect(screen.getByText(`Registration number: ${car.regNumber}`)).toBeInTheDocument();
  });

  test('renders login message if user is not logged in', () => {
    global.window = { location: { pathname: null } };
    render(
      <BrowserRouter>
        <CarCard car={car} />
      </BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={{ user: { token: null } }}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );
    expect(screen.getByText('You need to login in order to book!')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
   
  });

  test('renders book button if user is logged in and has renterId', () => {
    render(
      <BrowserRouter>
        <CarCard car={car} />
      </BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={{ user: { token: '123', user: { renterId: true } } }}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );
    expect(screen.getByText('Book')).toBeInTheDocument();
   
  });

  test('does not render book button if user is logged in but does not have renterId', () => {
    render(
      <BrowserRouter>
        <CarCard car={car} />
      </BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={{ user: { token: '123', user: { renterId: false } } }}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );
    expect(screen.queryByText('Book')).not.toBeInTheDocument();
  });
});

