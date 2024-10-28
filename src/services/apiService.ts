import { Repository } from "../models/Repository";

export const fetchRepositories = async (page: number): Promise<{ items: Repository[] }> => {
    const response = await fetch(`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`);
    if (!response.ok) throw new Error("Ошибка при загрузке данных");
    return response.json();
};