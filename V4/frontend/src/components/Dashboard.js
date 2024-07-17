import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Link, Route, useNavigate, Outlet } from 'react-router-dom';
import UserProfile from './UserProfile'; // Remplacez Overview par UserProfile
import Projects from './Projects';
import Analytics from './Analytics';

const theme = {
    colors: {
        primary: '#F0F2F5',
        secondary: '#7B8794',
        background: '#F5F7FA',
        text: '#1F2933',
        active: '#CBD2D9',
        hover: '#E4E7EB',
    },
    fonts: {
        main: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    breakpoints: {
        mobile: '768px',
        tablet: '992px',
    },
};

const SidebarSection = ({ label, isActive, onClick }) => (
    <NavItem isActive={isActive}>
        <NavLink to={`/dashboard/${label.toLowerCase()}`} onClick={onClick}>
            <Label>{label}</Label>
        </NavLink>
    </NavItem>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState('userProfile');

    const handleSectionClick = useCallback((section) => {
        setCurrentSection(section);
        navigate(`/dashboard/${section}`);
    }, [navigate]);

    const sidebarSections = [
        { label: 'Profile' },
        { label: 'Projects' },
        { label: 'Analytics' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer>
                <Sidebar>
                    {sidebarSections.map((section) => (
                        <SidebarSection
                            key={section.label}
                            label={section.label}
                            isActive={currentSection === section.label.toLowerCase()}
                            onClick={() => handleSectionClick(section.label.toLowerCase())}
                        />
                    ))}
                </Sidebar>
                <MainContent>
                    <ContentWrapper>
                        <Routes>
                            <Route path="/" element={<Outlet />}>
                                <Route index element={<UserProfile />} /> 
                                <Route path="profile" element={<UserProfile />} /> 
                                <Route path="projects" element={<Projects />} />
                                <Route path="analytics" element={<Analytics />} />
                            </Route>
                        </Routes>
                    </ContentWrapper>
                </MainContent>
            </DashboardContainer>
        </ThemeProvider>
    );
};

const DashboardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
`;

const Sidebar = styled.aside`
    width: 250px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    padding: 20px 0;
    transition: width 0.3s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 80px;
    }
`;

const NavItem = styled.div`
    margin-bottom: 5px;
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.active : 'transparent')};
    border-left: 4px solid ${({ isActive, theme }) => (isActive ? theme.colors.secondary : 'transparent')};
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 12px 20px;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.hover};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 12px;
        justify-content: center;
    }
`;

const Label = styled.span`
    font-weight: 500;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none;
    }
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const ContentWrapper = styled.div`
    padding: 30px;
    flex: 1;
`;

export default Dashboard;
