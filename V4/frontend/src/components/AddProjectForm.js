import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ value, onChange }) => {
    return (
        <StarContainer>
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                    key={star}
                    icon={faStar}
                    filled={star <= value}
                    onClick={() => onChange(star)}
                />
            ))}
        </StarContainer>
    );
};

const AddProjectForm = () => {
    const [formData, setFormData] = useState({
        // ... (votre état initial)
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStarRatingChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/projects', formData);
            navigate('/dashboard/projects');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageContainer>
            <BackButton onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} /> Retour
            </BackButton>
            <FormContainer>
                <FormHeader>Ajouter un Nouveau Projet</FormHeader>
                <StyledForm onSubmit={handleSubmit}>
                    <FormSection>
                        <SectionTitle>Informations Générales</SectionTitle>
                        <FormGroup>
                            <Label>Nom du Projet</Label>
                            <Input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Identité du Client</Label>
                            <Input type="text" name="clientIdentity" value={formData.clientIdentity} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Entreprise</Label>
                            <Input type="text" name="company" value={formData.company} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Niveau de Communication</Label>
                            <Select name="communicationLevel" value={formData.communicationLevel} onChange={handleChange}>
                                <option value="" disabled>Sélectionnez un niveau</option>
                                <option value="Confidentiel">Confidentiel</option>
                                <option value="Public">Public</option>
                                <option value="Autre">Autre</option>
                            </Select>
                        </FormGroup>
                    </FormSection>

                    <FormSection>
                        <SectionTitle>Contact Client</SectionTitle>
                        <FormGroup>
                            <Label>Prénom</Label>
                            <Input type="text" name="clientContactFirstName" value={formData.clientContactFirstName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nom</Label>
                            <Input type="text" name="clientContactLastName" value={formData.clientContactLastName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Poste</Label>
                            <Input type="text" name="clientContactJob" value={formData.clientContactJob} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" name="clientContactEmail" value={formData.clientContactEmail} onChange={handleChange} />
                        </FormGroup>
                    </FormSection>

                    <FormSection>
                        <SectionTitle>Détails du Projet</SectionTitle>
                        <FormGroup>
                            <Label>Chef de Projet Komodal</Label>
                            <Input type="text" name="komodalProjectManagerFirstName" value={formData.komodalProjectManagerFirstName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Cas d'Usage</Label>
                            <Select name="useCase" value={formData.useCase} onChange={handleChange}>
                                <option value="" disabled>Sélectionnez un cas d'usage</option>
                                <option value="formation">Formation</option>
                                <option value="event">Événement</option>
                                <option value="onboarding">Onboarding</option>
                                <option value="recruitment">Recrutement</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Budget</Label>
                            <Input type="text" name="budget" value={formData.budget} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date de Début</Label>
                            <Input type="month" name="startDate" value={formData.startDate} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date de Fin</Label>
                            <Input type="month" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Objectifs</Label>
                            <Textarea name="objectives" value={formData.objectives} onChange={handleChange}></Textarea>
                        </FormGroup>
                    </FormSection>

                    <FormSection>
                        <SectionTitle>Plateforme et Évaluation</SectionTitle>
                        <FormGroup>
                            <Label>Plateforme Utilisée</Label>
                            <Input type="text" name="platformUsed" value={formData.platformUsed} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nombre de Comptes Créés</Label>
                            <Input type="number" name="accountsCreated" value={formData.accountsCreated} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Feedback Client sur l'Accompagnement Komodal</Label>
                            <StarRating
                                value={formData.komodalSupportRating}
                                onChange={(value) => handleStarRatingChange('komodalSupportRating', value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Feedback Client sur la Plateforme</Label>
                            <StarRating
                                value={formData.platformRating}
                                onChange={(value) => handleStarRatingChange('platformRating', value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Feedback Komodal sur la Plateforme</Label>
                            <StarRating
                                value={formData.komodalPlatformRating}
                                onChange={(value) => handleStarRatingChange('komodalPlatformRating', value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Commentaire Komodal</Label>
                            <Textarea name="komodalComment" value={formData.komodalComment} onChange={handleChange}></Textarea>
                        </FormGroup>
                    </FormSection>

                    <SubmitButton type="submit">Ajouter le Projet</SubmitButton>
                </StyledForm>
            </FormContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 40px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: #555;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
        color: #333;
    }
`;

const FormContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 40px;
`;

const FormHeader = styled.h1`
    color: #333;
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
`;

const StyledForm = styled.form`
    display: grid;
    gap: 30px;
`;

const FormSection = styled.div`
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 20px;
`;

const SectionTitle = styled.h2`
    color: #444;
    font-size: 18px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: white;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    min-height: 100px;
    resize: vertical;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const StarContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const StarIcon = styled(FontAwesomeIcon)`
    color: ${props => props.filled ? '#ffc107' : '#e4e5e9'};
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: #ffc107;
    }
`;

export default AddProjectForm;