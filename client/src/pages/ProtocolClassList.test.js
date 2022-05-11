import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProtocolClassList from './ProtocolClassList';
import ProtocolClassListResults from '../components/protocols-class/ProtocolClassListResults';
import { BrowserRouter } from 'react-router-dom';

const protocol = {
    number: '559',
    date: new Date(),
    application: [
        {
            id: 1,
            number: 'РУО-111',
            student: {
                name: 'Miroslav Diqnov Balev',
                school: 'НПМГ',
                cityAndCountry: 'София, България'
            },
            inNumber: 'РУО-12',
            inDate: new Date(),
            admits: 'ПРИЗНАВА ЗАВЪРШЕН ДЕСЕТИ КЛАС',
            equivalenceExams: "[]"
        }
    ],
    president: 'President',
    vicePresidents: JSON.stringify(['a', 'b']),
    members: JSON.stringify(['one', 'two'])
}

afterEach(cleanup);

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <ProtocolClassList />
        </BrowserRouter>
    );
});

test('renders without protocols available', () => {
    render(
        <BrowserRouter>
            <ProtocolClassListResults protocols={[]} page={0} limit={10} total={0}/>
        </BrowserRouter>
    );
    expect(screen.getByText('Няма записи')).toBeInTheDocument();
});

test('renders with protocols available', () => {
    render(
        <BrowserRouter>
            <ProtocolClassListResults 
                protocols={[protocol]}
                page={0}
                limit={10}
                total={0}
            />
        </BrowserRouter>
    );
    expect(screen.getByText('№ 559')).toBeInTheDocument();
});

test('renders protocols application', () => {
    render(
        <BrowserRouter>
            <ProtocolClassListResults
                protocols={[protocol]}
                page={0}
                limit={10}
                total={1}
            />
        </BrowserRouter>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    const el = screen.getByTestId('number');
    expect(el.textContent).toContain('559 - 1');
})