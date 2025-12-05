import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FilterPipe } from "../../pipes/filter-pipe";
import { Rewards } from '../../model/rewards';
import { Reward } from '../../services/reward';

@Component({
  selector: 'app-listing',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './listing.html',
  styleUrl: './listing.css',
})
export class Listing {

  rewards: Rewards[] = [];
  filteredRewards: Rewards[] = [];
  categories: string[] = [];
  searchText: string = '';
  appliedFilters: string[] = [];

  constructor(private rewardService: Reward) { }

  ngOnInit(): void {
    this.rewards = this.rewardService.getRewards();
    this.filteredRewards = [...this.rewards];
    this.categories = this.rewardService.getCategories();
  }

  onSearchChange(): void {
    this.filteredRewards = this.rewardService.searchRewards(this.searchText);
  }

  toggleCategory(category: string): void {
    if (this.appliedFilters.includes(category)) {
      this.appliedFilters = this.appliedFilters.filter(f => f !== category);
    } else {
      this.appliedFilters.push(category);
    }

    this.filterRewards();
  }

  removeFilter(category: string): void {
    this.appliedFilters = this.appliedFilters.filter(f => f !== category);
    this.filterRewards();
  }

  clearFilters(): void {
    this.appliedFilters = [];
    this.filterRewards();
  }

  private filterRewards(): void {
    this.filteredRewards = this.rewards.filter(reward => {
      const matchesSearch = reward.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory =
        this.appliedFilters.length ? this.appliedFilters.includes(reward.category || '') : true;

      return matchesSearch && matchesCategory;
    });
  }
  isSortPanelOpen = false;
  isSortPanelOpen1 = false;
  toggleSortPanel(): void {
    this.isSortPanelOpen1 = !this.isSortPanelOpen1;
    setTimeout(() => {
      this.isSortPanelOpen = !this.isSortPanelOpen;
    }, 10);
  }
  sortByName(order: 'ASC' | 'DESC'): void {
    if (order === 'ASC') {
      this.filteredRewards = [...this.filteredRewards].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.filteredRewards = [...this.filteredRewards].sort((a, b) => b.name.localeCompare(a.name));
    }
    this.isSortPanelOpen = false;
    this.isSortPanelOpen1 = false;
  }
}
