import Container from './Container';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
    const location = useLocation();
    const [bookData, setBookData] = useState(null);
    const segments = location.pathname.split('/').filter((segment) => segment !== '');

    const getBookData = async (id) => {
        try {
            const URL = `https://api.matgargano.com/api/books/${id}`;
            const response = await fetch(URL);
            const data = await response.json();
            setBookData(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (segments.length === 2 && segments[0] === 'books') {
            getBookData(segments[1]);
        } else {
            setBookData(null);
        }
    }, [location]);

    const getClassName = (props) => {
        return `${props.isActive ? 'font-bold' : ''} hover:underline hover:text-gray-600 transition duration-300 `;
    };

    return (
        <Container className="bg-gray-300">
            <nav className="flex gap-4">
                <RouterLink className={getClassName} to="/">
                    Home
                </RouterLink>
                <RouterLink className={getClassName} to="/about">
                    About
                </RouterLink>
                <RouterLink className={getClassName} to="/books">
                    Books
                </RouterLink>
                
                {/*if bookData is truthy, we render the span, containing book title*/}
                {bookData && (
                    <span className="mx-2">
                        &gt; {bookData.title}
                    </span>
                )}
            </nav>
        </Container>
    );
};

export default Header;
