import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const KomodalContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
`;

const KomodalHeader = styled.header`
  text-align: center;
  margin-bottom: 50px;
`;

const KomodalTitle = styled.h1`
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const KomodalSubtitle = styled.p`
  font-size: 1.2em;
  color: #7f8c8d;
`;

const KomodalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const KomodalCard = styled(Link)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.i`
  font-size: 3em;
  margin-bottom: 20px;
  color: #3498db;
`;

const CardTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 1em;
  color: #7f8c8d;
`;

function KomodalProjects() {
    return (
        <KomodalContainer>
            <KomodalHeader>
                <KomodalTitle>Gestion de Base de Données KOMODAL</KomodalTitle>
                <KomodalSubtitle>Gérez efficacement vos projets et vos données</KomodalSubtitle>
            </KomodalHeader>
            <KomodalGrid>
                <KomodalCard to="/add-project">
                    <CardIcon className="fas fa-plus-circle" />
                    <CardTitle>Ajouter un Projet</CardTitle>
                    <CardDescription>Créez et configurez un nouveau projet dans la base de données</CardDescription>
                </KomodalCard>
                <KomodalCard to="/projects-table">
                    <CardIcon className="fas fa-list-ul" />
                    <CardTitle>Liste des Projets</CardTitle>
                    <CardDescription>Consultez et gérez la liste complète des projets</CardDescription>
                </KomodalCard>
                <KomodalCard to="/data-import-export">
                    <CardIcon className="fas fa-exchange-alt" />
                    <CardTitle>Import/Export de Données</CardTitle>
                    <CardDescription>Importez ou exportez des données de projets</CardDescription>
                </KomodalCard>
            </KomodalGrid>
        </KomodalContainer>
    );
}

export default KomodalProjects;