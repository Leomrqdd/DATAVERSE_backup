import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PieController, ArcElement } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, PieController, ArcElement);

const Analytics = () => {
    const [userStats, setUserStats] = useState({});
    const [projectStats, setProjectStats] = useState({});

    const fetchAnalyticsData = async () => {
        try {
            const [userResponse, projectResponse] = await Promise.all([
                axios.get('/analytics/users'),
                axios.get('/analytics/projects')
            ]);
            setUserStats(userResponse.data);
            setProjectStats(projectResponse.data);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        }
    };

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>New Users per Month</Card.Title>
                            <Bar
                                data={{
                                    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                                    datasets: [{
                                        label: 'New Users',
                                        data: userStats.newUsersData || [],
                                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                        borderColor: 'rgba(54, 162, 235, 1)',
                                        borderWidth: 1
                                    }]
                                }}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            precision: 0
                                        }
                                    }
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Active vs Completed Projects</Card.Title>
                            <Pie
                                data={{
                                    labels: ['Active Projects', 'Completed Projects'],
                                    datasets: [{
                                        data: projectStats.activeVsCompleted || [],
                                        backgroundColor: ['#36A2EB', '#FF6384'],
                                        hoverBackgroundColor: ['#36A2EB', '#FF6384']
                                    }]
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Last 10 Users</Card.Title>
                            <ul>
                                {userStats.userDetails && userStats.userDetails.map(user => (
                                    <li key={user.id}>
                                        {user.first_name} {user.last_name} ({user.email}) - {user.created_at}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Analytics;
