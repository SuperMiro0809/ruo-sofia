import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProtocolList from './ProtocolList';
import ProtocolListResults from '../components/protocol/ProtocolListResults';
import { BrowserRouter } from 'react-router-dom';

const protocol = {
    number: 'РУО-558',
    date: new Date(),
    about: 'info',
    president: 'President', 
    members: JSON.stringify(['One', 'Two']),
    application: [
        {
            id: 1,
            ruoNumber: 'РУО-111',
            teacher: {
                firstName: 'Miroslav',
                middleName: 'Diqnov',
                lastName: 'Balev'
            },
            teaching: [
                {
                    credits: 1,
                    approve: 'info why approved',
                    notApprove: null
                }
            ],
            report: [],
            publication: []
        }
    ]
}

afterEach(cleanup);

test('renders without crashing', () => {
    render(
        <BrowserRouter>
            <ProtocolList />
        </BrowserRouter>
    );
});

test('renders without protocols available', () => {
    render(
        <BrowserRouter>
            <ProtocolListResults protocols={[]} page={0} limit={10} total={0}/>
        </BrowserRouter>
    );
    expect(screen.getByText('Няма записи')).toBeInTheDocument();
});

test('renders with protocols available', () => {
    render(
        <BrowserRouter>
            <ProtocolListResults 
                protocols={[protocol]}
                page={0}
                limit={10}
                total={0}
            />
        </BrowserRouter>
    );
    expect(screen.getByText('№ РУО-558')).toBeInTheDocument();
});

test('renders protocols application', () => {
    render(
        <BrowserRouter>
            <ProtocolListResults
                protocols={[protocol]}
                page={0}
                limit={10}
                total={1}
            />
        </BrowserRouter>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    const el = screen.getByTestId('ruoNumber');
    expect(el.textContent).toContain('№ РУО-111');
})