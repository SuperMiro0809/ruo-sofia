import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubjectList from './SubjectList';
import SubjectListResult from '../components/subjects/SubjectListResult';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('renders without crashing', () => {
    render(
        <BrowserRouter>
          <SubjectList />
        </BrowserRouter>
    );
});

test('renders without subjects available', () => {
    render(
        <BrowserRouter>
          <SubjectListResult openSubjectModalProp={{ openSubjectModal: false }} subjects={[]} page={0} limit={10} total={0}/>
        </BrowserRouter>
    );
    expect(screen.getByText('Няма записи')).toBeInTheDocument();
});

test('renders with subjects available', () => {
    render(
        <BrowserRouter>
          <SubjectListResult openSubjectModalProp={{ openSubjectModal: false }} subjects={[ { name: 'Математика' } ]} page={0} limit={10} total={1}/>
        </BrowserRouter>
    );
    expect(screen.getByText('Математика')).toBeInTheDocument();
});