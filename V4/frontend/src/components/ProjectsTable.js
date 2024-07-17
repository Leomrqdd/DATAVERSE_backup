import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);
    const [displayedAttributes, setDisplayedAttributes] = useState([]);
    const [showColumnFilter, setShowColumnFilter] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [filters, setFilters] = useState({
        projectName: '',
        useCase: '',
        budget: '',
        platformUsed: '',
        startDate: '',
        endDate: '',
        clientIdentity: '',
        company: '',
        communicationLevel: '',
        clientContactJob: '',
        objectives: '',
        accountsCreated: '',
        komodalSupportRating: '',
        platformRating: '',
        komodalPlatformRating: '',
        komodalComment: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/projects');
            setProjects(response.data.projects);

            const customOrder = [
                'projectName',
                'clientIdentity',
                'company',
                'communicationLevel',
                'clientContactFirstName',
                'clientContactLastName',
                'clientContactJob',
                'clientContactEmail',
                'komodalProjectManagerFirstName',
                'useCase',
                'budget',
                'startDate',
                'endDate',
                'objectives',
                'platformUsed',
                'accountsCreated',
                'komodalSupportRating',
                'platformRating',
                'komodalPlatformRating',
                'komodalComment'
            ];

            const attributes = customOrder.filter(attr => Object.keys(response.data.projects[0] || {}).includes(attr));
            setDisplayedAttributes(attributes);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`http://localhost:5000/projects/${projectId}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEdit = (projectId) => {
        navigate(`/edit-project/${projectId}`);
    };

    const handleAttributeSelection = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setDisplayedAttributes([...displayedAttributes, value]);
        } else {
            setDisplayedAttributes(displayedAttributes.filter(attr => attr !== value));
        }
    };

    const toggleColumnFilter = () => {
        setShowColumnFilter(!showColumnFilter);
    };

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`http://localhost:5000/projects/filter?${queryParams}`);
            setProjects(response.data.projects);
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    return (
        <TableContainer>
            <Title>Projects List</Title>
            <FilterButton onClick={toggleColumnFilter}>Filter By Column</FilterButton>
            <AdvancedFiltersButton onClick={toggleAdvancedFilters}>Advanced Filters</AdvancedFiltersButton>
            {showAdvancedFilters && (
                <AdvancedFiltersForm>
                    <label>
                        Project Name:
                        <input type="text" name="projectName" value={filters.projectName} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Use Case:
                        <input type="text" name="useCase" value={filters.useCase} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Budget Range:
                        <input type="text" name="budget" placeholder="min-max" value={filters.budget} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Platform Used:
                        <input type="text" name="platformUsed" value={filters.platformUsed} onChange={handleFilterChange} />
                    </label>
                    <label>
                        Start Date:
                        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
                    </label>
                    {/* Add more filter fields as needed */}
                    <ApplyFiltersButton onClick={applyFilters}>Apply Filters</ApplyFiltersButton>
                </AdvancedFiltersForm>
            )}
            {showColumnFilter && (
                <ColumnFilter>
                    {Object.keys(projects.length > 0 ? projects[0] : {}).map(attr => (
                        <label key={attr}>
                            <input
                                type="checkbox"
                                value={attr}
                                checked={displayedAttributes.includes(attr)}
                                onChange={handleAttributeSelection}
                            /> {getColumnDisplayName(attr)}
                        </label>
                    ))}
                </ColumnFilter>
            )}
            <ScrollableTableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            {displayedAttributes.map(attr => (
                                <th key={attr}>{getColumnDisplayName(attr)}</th>
                            ))}
                            <th></th> {/* Empty header cell for icons */}
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <tr key={index}>
                                    {displayedAttributes.map(attr => (
                                        <td key={attr}>
                                            {project[attr] || 'N/A'}
                                        </td>
                                    ))}
                                    <td>
                                        <IconButton onClick={() => handleEdit(project.id)}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(project.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={displayedAttributes.length + 1}>No projects found</td>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </ScrollableTableContainer>
        </TableContainer>
    );
};

const getColumnDisplayName = (attr) => {
    switch (attr) {
        case 'projectName':
            return 'Project Name';
        case 'clientIdentity':
            return 'Client Identity';
        case 'company':
            return 'Company';
        case 'communicationLevel':
            return 'Communication Level';
        case 'clientContactFirstName':
            return 'Client Contact First Name';
        case 'clientContactLastName':
            return 'Client Contact Last Name';
        case 'clientContactJob':
            return 'Client Contact Job';
        case 'clientContactEmail':
            return 'Client Contact Email';
        case 'komodalProjectManagerFirstName':
            return 'Komodal Project Manager First Name';
        case 'useCase':
            return 'Use Case';
        case 'budget':
            return 'Budget';
        case 'startDate':
            return 'Start Date';
        case 'endDate':
            return 'End Date';
        case 'objectives':
            return 'Objectives';
        case 'platformUsed':
            return 'Platform Used';
        case 'accountsCreated':
            return 'Accounts Created';
        case 'komodalSupportRating':
            return 'Komodal Support Rating';
        case 'platformRating':
            return 'Platform Rating';
        case 'komodalPlatformRating':
            return 'Komodal Platform Rating';
        case 'komodalComment':
            return 'Komodal Comment';
        default:
            return attr;
    }
};

const TableContainer = styled.div`
    margin: 20px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const FilterButton = styled.button`
    margin-bottom: 10px;
`;

const AdvancedFiltersButton = styled.button`
    margin-bottom: 10px;
    margin-left: 10px;
`;

const AdvancedFiltersForm = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const ApplyFiltersButton = styled.button`
    margin-top: 10px;
`;

const ColumnFilter = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const ScrollableTableContainer = styled.div`
    overflow-x: auto;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
        text-align: left;
    }

    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tbody tr:hover {
        background-color: #f1f1f1;
    }
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 5px;
    font-size: 16px;
    color: gray;

    &:hover {
        color: black;
    }
`;

export default ProjectsTable;
