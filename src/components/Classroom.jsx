import { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Pagination } from "react-bootstrap";
import Student from './Student';

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 24;

    const API = 'https://cs571api.cs.wisc.edu/rest/f24/hw4/students';

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(API, {
                    headers: {
                        'X-CS571-ID': CS571.getBadgerId(),
                    }
                });
                if (!response.ok) {
                    throw new Error(`ERROR: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setStudents(data);
            } catch (error) {
                console.error('Could not fetch data:', error);
            }
        };

        fetchStudents();
    }, []);

    const filtered = students.filter(student => {
        const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
        const matchName = fullName.includes(searchName.toLowerCase().trim());
        const matchMajor = student.major.toLowerCase().includes(searchMajor.toLowerCase().trim());
        const matchInterest = student.interests.some(interest =>
            interest.toLowerCase().includes(searchInterest.toLowerCase().trim())
        );

        return matchName && matchMajor && matchInterest;
    });

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filtered.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filtered.length / studentsPerPage);

    const resetSearch = () => {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>Badger Book</h1>
            <p>Search for students below!</p>
            <hr />
            <Form>
                <Form.Label htmlFor="searchName">Name</Form.Label>
                <Form.Control
                    id="searchName"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                />
                <Form.Label htmlFor="searchMajor">Major</Form.Label>
                <Form.Control
                    id="searchMajor"
                    value={searchMajor}
                    onChange={e => setSearchMajor(e.target.value)}
                />
                <Form.Label htmlFor="searchInterest">Interest</Form.Label>
                <Form.Control
                    id="searchInterest"
                    value={searchInterest}
                    onChange={e => setSearchInterest(e.target.value)}
                />
                <br />
                <Button variant="neutral" onClick={resetSearch}>Reset Search</Button>
            </Form>
            <p>There are {filtered.length} student(s) matching your search.</p>
            <Container fluid>
                <Row xs={1} sm={1} md={2} lg={3} xl={4}>
                    {currentStudents.map(student => (
                        <Student key={student.id} {...student} />
                    ))}
                </Row>
            </Container>
            <Pagination>
                <Pagination.Prev
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Pagination.Next>
            </Pagination>
        </div>
    );
};

export default Classroom;
