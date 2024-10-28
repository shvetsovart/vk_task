import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { repositoryStore } from "./stores/RepositoryStore";
import RepositoryItem from "./components/RepositoryItem";
import { Repository } from "./models/Repository";
import { Divider, Select, List, Typography, Spin } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { LoadingOutlined } from '@ant-design/icons';

const App: React.FC = observer(() => {
    useEffect(() => {
        repositoryStore.loadRepositories();
    }, []);

    const handleSortChange = (value: string | undefined) => {
        if (value) {
            repositoryStore.setSortKey(value as keyof Repository);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
            repositoryStore.loadRepositories();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sortOptions = [
        { value: 'name', label: <Text>Name</Text> },
        { value: 'stargazers_count', label: <Text>Stars</Text> },
        { value: 'forks_count', label: <Text>Forks</Text> },
        { value: 'language', label: <Text>Language</Text> },
      ];

    return (
        <div>
            <Title style={{textAlign: "center"}}>GitHub Repositories</Title>
            <Divider style={{margin: "0 auto"}}>
                <Text style={{marginRight: "5px"}}>Sort by: </Text>
                <Select
                options={sortOptions}
                defaultValue="Nothing"
                style={{width: 120}}
                onChange={handleSortChange}
                />
            </Divider>
            <List
            size="small"
            >
                {repositoryStore.repositories.map((repo) => (
                    <RepositoryItem key={repo.id} repo={repo} />
                ))}
            </List>
            {repositoryStore.isLoading && (
                <div style={{textAlign: "center", padding: "4px 0"}}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    <Paragraph style={{paddingTop: "12px"}}>Loading more repositories...</Paragraph>
                </div>
                )}
        </div>
    );


});

export default App;
