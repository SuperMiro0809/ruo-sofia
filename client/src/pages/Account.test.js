import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Account from './Account';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

beforeEach(() => {
    render(
        <BrowserRouter>
            <UserContext.Provider value={[{ avatar: '', name: 'miro', role: 'Administrator' }]}>
                <Account />
            </UserContext.Provider>
        </BrowserRouter>
    )
})

let roles = {
    'Administrator': 'Администратор',
    'Qualifications': 'Квалификации',
    'Education': 'Образование',
    'Member': 'Потребител'
};

test('username should display', () => {
    expect(screen.getByText('miro')).toBeInTheDocument();
})

test('user role should display', () => {
    const roleP = screen.getByTestId('role');
    expect(roleP.textContent).toContain(roles['Administrator']);
})