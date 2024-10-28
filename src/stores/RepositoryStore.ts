import { makeAutoObservable } from "mobx";
import { fetchRepositories } from "../services/apiService";
import { Repository } from "../models/Repository";

type SortKey = keyof Repository;

class RepositoryStore {
    repositories: Repository[] = [];
    page = 1;
    isLoading = false;
    editingItem: Repository | null = null;
    sortKey: SortKey = "name";

    constructor() {
        makeAutoObservable(this);
    }

    async loadRepositories() {
        if (this.isLoading) return;
        this.isLoading = true;

        try {
            const data = await fetchRepositories(this.page);
            this.repositories = [...this.repositories, ...data.items];
            this.page++;
        } catch (error) {
            console.error("Ошибка при загрузке:", error);
        } finally {
            this.isLoading = false;
        }
    }

    sortRepositories() {
        this.repositories = this.repositories.sort((a, b) => {
            const valueA = a[this.sortKey];
            const valueB = b[this.sortKey];
            if (typeof valueA === "string" && typeof valueB === "string") {
                return valueA.localeCompare(valueB);
            }
            return (valueA as number) - (valueB as number);
        });
    }

    setSortKey(key: SortKey) {
        this.sortKey = key;
        this.sortRepositories();
    }

    startEditing(item: Repository): void {
        this.editingItem = item;
    }

    removeRepository(id: number): void {
        this.repositories = this.repositories.filter(repo => repo.id !== id);
    }

    saveChanges(updatedRepository: Repository): void {
        this.repositories = this.repositories.map(repo =>
            repo.id === updatedRepository.id ? updatedRepository : repo
        );
        this.editingItem = null;
    }
}

export const repositoryStore = new RepositoryStore();
