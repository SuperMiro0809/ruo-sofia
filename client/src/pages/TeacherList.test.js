import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeacherList from './TeacherList';
import TeacherListResults from '../components/teachers/TeacherListResults';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <TeacherList />
        </BrowserRouter>
    );
});

test('renders without teachers available', () => {
    render(
        <BrowserRouter>
            <TeacherListResults teachers={[]} page={0} limit={10} total={0}/>
        </BrowserRouter>
    );
    expect(screen.getByText('Няма записи')).toBeInTheDocument();
});

test('renders with teachers available', () => {
    render(
        <BrowserRouter>
            <TeacherListResults teachers={[{ firstName: 'Miroslav', middleName: 'Diqnov', lastName: 'Balev', dateOfBirth: new Date(), application: [] }]} page={0} limit={10} total={0} />
        </BrowserRouter>
    );
    expect(screen.getByText('Miroslav Diqnov Balev')).toBeInTheDocument();
});

test('renders teachers application', () => {
    render(
        <BrowserRouter>
            <TeacherListResults
                teachers={[
                    {
                        id: 1,
                        firstName: 'Miroslav',
                        middleName: 'Diqnov',
                        lastName: 'Balev',
                        dateOfBirth: new Date(),
                        application: [
                            {
                                ruoNumber: 'RUO-1',
                                date: new Date(),
                                adress: 'Sofia',
                                tel: '0878743988',
                                workplace: {
                                    place: 'NPMG',
                                    city: 'Sofia',
                                    area: 'Sofia-grad',
                                    position: 'Uchitel'
                                },
                                education: {
                                    school: 'FMI',
                                    city: 'Sofia',
                                    qualification: 'IT',
                                    degree: 'IT'
                                },
                                diploma: {
                                    number: '111',
                                    from: 'FMI'
                                }
                            }
                        ]
                    }
                ]}
                page={0}
                limit={10}
                total={1}
            />
        </BrowserRouter>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    const el = screen.getByTestId('ruoNumber');
    expect(el.textContent).toContain('№ RUO-1');
})