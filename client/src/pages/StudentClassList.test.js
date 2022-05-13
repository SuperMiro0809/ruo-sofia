import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentClassList from './StudentClassList';
import StudentsClassListResult from '../components/students-class/StudentsClassListResult';
import { BrowserRouter } from 'react-router-dom';

const student = {
    name: 'Miroslav Diqnov Balev',
    egn: '1111111111',
    dateOfBirth: new Date(),
    school: 'NPMG',
    citizenship: 'Bulgarsko',
    cityAndCountry: 'Sofia, Bulgaria',
    application: [
        {
            registerNumber: '12',
            dateOut: new Date(),
            documentNumber: '1122',
            documentDate: new Date(),
            inNumber: '55',
            inDate: new Date(),
            class: 'X',
            admits: 'ПРИЗНАВА ЗАВЪРШЕН ДЕСЕТИ КЛАС',
            equivalenceExamsDate: null,
            equivalenceExams: [],
            grades: JSON.stringify([{ name: 'Математика', grade: '6' }])
        }
    ]
}

afterEach(cleanup);

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <StudentClassList />
        </BrowserRouter>
    );
});

test('renders without students available', () => {
    render(
        <BrowserRouter>
            <StudentsClassListResult students={[]} page={0} limit={10} total={0}/>
        </BrowserRouter>
    );
    expect(screen.getByText('Няма записи')).toBeInTheDocument();
});

test('renders with students available', () => {
    render(
        <BrowserRouter>
            <StudentsClassListResult 
                students={[student]}
                page={0}
                limit={10}
                total={0}
            />
        </BrowserRouter>
    );
    expect(screen.getByText('1111111111')).toBeInTheDocument();
});

test('renders students application', () => {
    render(
        <BrowserRouter>
            <StudentsClassListResult
                students={[student]}
                page={0}
                limit={10}
                total={1}
            />
        </BrowserRouter>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    const el = screen.getByTestId('number');
    expect(el.textContent).toContain('12');
})