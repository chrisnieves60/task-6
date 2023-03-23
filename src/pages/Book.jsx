import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Book = () => {
    const params = useParams();
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getBookData = async () => {
        try {
            const URL = `https://api.matgargano.com/api/books/${params.id}`;
            setLoading(true);
            setError(false);
            const response = await fetch(URL);
            const data = await response.json();
            setBookData([data]);
        } catch (e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookData();
    }, []);

    return (
        <Container>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {!error && loading && (
                <div className="max-w-[230px]">
                    <Skeleton count="10" />
                </div>
            )}

            {!error && !loading && (
                <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto">
                    <img
                        src={bookData[0]?.imageURL}
                        alt={bookData[0]?.title}
                        className="rounded-lg mb-4"
                    />
                    <h1 className="text-xl font-semibold mb-2">
                        {bookData[0]?.title}
                    </h1>
                    <p className="text-gray-600 mb-2">
                        Author: {bookData[0]?.author}
                    </p>
                    <p className="text-gray-500">
                        Year: {bookData[0]?.year}
                    </p>
                    <p className="text-gray-500">
                        Pages: {bookData[0]?.pages}
                    </p>
                </div>
            )}
        </Container>
    );
};

export default Book;
