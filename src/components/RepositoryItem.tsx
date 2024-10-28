import React, { useState } from "react";
import { repositoryStore } from "../stores/RepositoryStore";
import { Repository } from "../models/Repository";
import { Button, Input, Typography, List, Divider } from 'antd';

const { Title, Paragraph, Link } = Typography;
const { TextArea } = Input;

interface RepositoryItemProps {
    repo: Repository;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(repo.name);
    const [description, setDescription] = useState(repo.description || "");
    const [language, setLanguage] = useState(repo.language);
    const [stargazersCount, setStargazersCount] = useState(repo.stargazers_count);
    const [forksCount, setForksCount] = useState(repo.forks_count);
    const [htmlUrl] = useState(repo.html_url);

    const handleEdit = () => {
        setIsEditing(true);
        repositoryStore.startEditing(repo);
    };

    const handleDelete = () => {
        repositoryStore.removeRepository(repo.id);
    };

    const handleSave = () => {
        repositoryStore.saveChanges({
            ...repo,
            name,
            description,
            language,
            stargazers_count: stargazersCount,
            forks_count: forksCount,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(repo.name);
        setDescription(repo.description || "");
        setLanguage(repo.language);
        setStargazersCount(repo.stargazers_count);
        setForksCount(repo.forks_count);
    };

    return (
        <List.Item style={{display: "grid", gridTemplateColumns: "20% 20% 10% 10% 10% 10% 10% 10%", alignItems: "center"}}>
            {isEditing ? (
                <>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{margin: "0 0.5rem", width: "90%"}}/>
                    <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{margin: "0 0.5rem", width: "90%"}}/>
                    <Input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language" style={{margin: "0 0.5rem", width: "90%"}}/>
                    <Input type="number"
                           value={stargazersCount}
                           onChange={(e) => setStargazersCount(Number(e.target.value))}
                           placeholder="Stars"
                           style={{margin: "0 0.5rem", width: "90%"}}/>
                    <Input type="number"
                           value={forksCount}
                           onChange={(e) => setForksCount(Number(e.target.value))}
                           placeholder="Forks"
                           style={{margin: "0 0.5rem", width: "90%"}}/>
                    <div></div>
                    <Button onClick={handleSave} style={{margin: "0 0.5rem"}}>Save</Button>
                    <Button onClick={handleCancel} style={{margin: "0 0.5rem"}}>Cancel</Button>
                </>
            ) : (
                <>
                    <Title level={2} style={{whiteSpace: "normal", padding: "0.5rem", textAlign: "center"}}>{name}</Title>
                    <Paragraph style={{whiteSpace: "normal", textAlign: "center", marginBottom: "initial"}}>{description || "No description available."}</Paragraph>
                    <Paragraph style={{whiteSpace: "normal", textAlign: "center", marginBottom: "initial"}}>Language: {language}</Paragraph>
                    <Paragraph style={{textAlign: "center", marginBottom: "initial"}}>Stars: {stargazersCount}</Paragraph>
                    <Paragraph style={{textAlign: "center", marginBottom: "initial"}}>Forks: {forksCount}</Paragraph>
                    <Paragraph style={{textAlign: "center", marginBottom: "initial"}}>
                        <Link href={htmlUrl.toString()}>
                        View Repository
                        </Link>
                    </Paragraph>
                    <Button onClick={handleEdit} style={{margin: "0 0.5rem", alignContent: "center"}}>Edit</Button>
                    <Button onClick={handleDelete} style={{margin: "0 0.5rem"}}>Delete</Button>
                </>
            )}
        </List.Item>
    );
};

export default RepositoryItem;
