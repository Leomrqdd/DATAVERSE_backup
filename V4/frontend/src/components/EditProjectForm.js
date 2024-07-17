import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';


const StarRating = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <StarContainer>
            {stars.map((star) => (
                <Star
                    key={star}
                    filled={star <= value}
                    onClick={() => onChange(star)}
                >
                    ★
                </Star>
            ))}
        </StarContainer>
    );
};

const EditProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        projectName: '',
        clientIdentity: '',
        company: '',
        communicationLevel: '',
        clientContactFirstName: '',
        clientContactLastName: '',
        clientContactJob: '',
        clientContactEmail: '',
        komodalProjectManagerFirstName: '',
        useCase: '',
        budget: '',
        startDate: '',
        endDate: '',
        objectives: '',
        platformUsed: '',
        accountsCreated: '',
        komodalSupportRating: 0,
        platformRating: 0,
        komodalPlatformRating: 0,
        komodalComment: ''
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/projects/${id}`);
                const project = response.data;
                setFormData(project);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStarRatingChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/projects/${id}`, formData);
            alert('Project updated successfully!');
            navigate('/dashboard/projects'); 
        } catch (error) {
            alert('Error updating project!');
            console.error(error);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Modifier Projet</FormTitle>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nom Projet</Label>
                    <Input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Identité Client</Label>
                    <Input type="text" name="clientIdentity" value={formData.clientIdentity} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Entreprise</Label>
                    <Input type="text" name="company" value={formData.company} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Communication (confidentialité)</Label>
                    <Select name="communicationLevel" value={formData.communicationLevel} onChange={handleChange}>
                        <option value="" disabled>Choisissez le niveau de communication</option>
                        <option value="Confidentiel">Confidentiel</option>
                        <option value="Public">Public</option>
                        <option value="Autre">Autre</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Contact Client - Prénom</Label>
                    <Input type="text" name="clientContactFirstName" value={formData.clientContactFirstName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Contact Client - NOM</Label>
                    <Input type="text" name="clientContactLastName" value={formData.clientContactLastName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Contact Client - Job</Label>
                    <Input type="text" name="clientContactJob" value={formData.clientContactJob} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Contact Client - Email</Label>
                    <Input type="email" name="clientContactEmail" value={formData.clientContactEmail} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Chef de projet komodal - Prénom</Label>
                    <Input type="text" name="komodalProjectManagerFirstName" value={formData.komodalProjectManagerFirstName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Cas d’usage</Label>
                    <Select name="useCase" value={formData.useCase} onChange={handleChange}>
                        <option value="" disabled>Choisissez le cas d'usage</option>
                        <option value="formation">Formation</option>
                        <option value="event">Évent</option>
                        <option value="onboarding">Onboarding</option>
                        <option value="recruitment">Recrutement</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Budget</Label>
                    <Input type="text" name="budget" value={formData.budget} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Date de début</Label>
                    <Input type="month" name="startDate" value={formData.startDate} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Date de fin</Label>
                    <Input type="month" name="endDate" value={formData.endDate} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Objectifs</Label>
                    <Textarea name="objectives" value={formData.objectives} onChange={handleChange}></Textarea>
                </FormGroup>
                <FormGroup>
                    <Label>Plateforme utilisée</Label>
                    <Input type="text" name="platformUsed" value={formData.platformUsed} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Nombre de comptes créés</Label>
                    <Input type="text" name="accountsCreated" value={formData.accountsCreated} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Feedback client sur accompagnement komodal</Label>
                    <StarRating
                        value={formData.komodalSupportRating}
                        onChange={(value) => handleStarRatingChange('komodalSupportRating', value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Feedback client sur la plateforme</Label>
                    <StarRating
                        value={formData.platformRating}
                        onChange={(value) => handleStarRatingChange('platformRating', value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Feedback komodal sur la plateforme</Label>
                    <StarRating
                        value={formData.komodalPlatformRating}
                        onChange={(value) => handleStarRatingChange('komodalPlatformRating', value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Commentaire komodal</Label>
                    <Textarea name="komodalComment" value={formData.komodalComment} onChange={handleChange}></Textarea>
                </FormGroup>
                <Button type="submit">Modifier Projet</Button>
            </StyledForm>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    color: #333;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    color: #333;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    color: #333;
`;

const Button = styled.button`
    padding: 15px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background: #0056b3;
    }
`;

const StarContainer = styled.div`
    display: inline-block;
    font-size: 24px;
`;

const Star = styled.span`
    color: ${(props) => (props.filled ? '#ffcc00' : '#ccc')};
    cursor: pointer;
`;

export default EditProjectForm;
