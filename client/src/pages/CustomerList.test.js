import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerList from './CustomerList';
import CustomerListResults from '../components/customer/CustomerListResults';
import { BrowserRouter } from 'react-router-dom';

test('renders without crashing', () => {
    render(
        <BrowserRouter>
          <CustomerList />
        </BrowserRouter>
    );
});

test('renders customers correctly', () => {
    render(
        <BrowserRouter>
          <CustomerListResults customers={[ { name: 'Miro', email: 'email@email.com', role: 'Administator' } ]} page={0} limit={10} total={1}/>
        </BrowserRouter>
    );
    const el = screen.getByTestId('customer-email');
    expect(el.textContent).toContain('email@email.com');
});