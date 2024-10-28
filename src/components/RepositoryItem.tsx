import React, { useState } from "react";
import { repositoryStore } from "../stores/RepositoryStore";
import { Repository } from "../models/Repository";
import { Button, Input, Typography, List } from 'antd';

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
        <List.Item style={{display: "flex", justifyContent: "start", gap: "20px", wordWrap: "break-word"}}>
            {isEditing ? (
                <>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
                    <Input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language" />
                    <Input type="number" value={stargazersCount} onChange={(e) => setStargazersCount(Number(e.target.value))} placeholder="Stars" />
                    <Input type="number" value={forksCount} onChange={(e) => setForksCount(Number(e.target.value))} placeholder="Forks" />
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </>
            ) : (
                <>
                    <Title level={2} style={{width: "300px", whiteSpace: "normal"}}>{name}</Title>
                    <Paragraph style={{width: "200px", whiteSpace: "normal"}}>{description || "No description available."}</Paragraph>
                    <Paragraph>Language: {language}</Paragraph>
                    <Paragraph>Stars: {stargazersCount}</Paragraph>
                    <Paragraph>Forks: {forksCount}</Paragraph>
                    <Paragraph>
                        <Link href={htmlUrl.toString()}>
                        View Repository
                        </Link>
                    </Paragraph>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </>
            )}
        </List.Item>
    );

};

export default RepositoryItem;
