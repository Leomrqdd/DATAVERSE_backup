import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProjectForm from './components/AddProjectForm';
import ProjectsTable from './components/ProjectsTable';
import Projects from './components/Projects';
import EditProjectForm from './components/EditProjectForm';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/add-project" element={<AddProjectForm />} />
                <Route path="/projects-table" element={<ProjectsTable />} />
                <Route path="/projects" element={<Projects />} /> 
                <Route path="/edit-project/:id" element={<EditProjectForm />} />
            </Routes>
        </Router>
    );
}

export default App;
