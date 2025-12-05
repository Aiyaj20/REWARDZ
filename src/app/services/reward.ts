import { Injectable } from '@angular/core';
import { Rewards } from '../model/rewards';

@Injectable({
  providedIn: 'root',
})
export class Reward {

  private rewards: Rewards[] = [
    {
      pk: 987,
      name: "Reward Name",
      points: 150,
      display_img_url: "assets/reward.svg",
      quantity: 14,
      valid_until: "2024-12-31T00:00:00",
      low_quantity: 10,
      category: "Electronics"
    },
    {
      pk: 988,
      name: "Amazon Gift Card",
      points: 200,
      display_img_url: "assets/amazon.svg",
      quantity: 5,
      valid_until: "2024-11-30T00:00:00",
      low_quantity: 10,
      category: "Gift Cards"
    },
    {
      pk: 989,
      name: "Wireless Headphones",
      points: 300,
      display_img_url: "assets/headphones.png",
      quantity: 20,
      valid_until: "2024-10-31T00:00:00",
      low_quantity: 15,
      category: "Electronics"
    },
    {
      pk: 990,
      name: "Coffee Maker",
      points: 250,
      display_img_url: "",
      quantity: 0,
      valid_until: "2024-09-30T00:00:00",
      low_quantity: 5,
      category: "Home Appliances"
    },
    {
      pk: 991,
      name: "Fitness Tracker",
      points: 180,
      display_img_url: "",
      quantity: 3,
      valid_until: "2024-08-31T00:00:00",
      low_quantity: 5,
      category: "Fitness"
    },
    {
      pk: 992,
      name: "Book Collection",
      points: 120,
      display_img_url: "",
      quantity: 25,
      valid_until: "2024-12-31T00:00:00",
      low_quantity: 20,
      category: "Books"
    }
  ];

  getRewards(): any[] {
    return this.rewards;
  }

  sortRewardsByName(rewards: Rewards[], order: 'asc' | 'desc' = 'asc'): Rewards[] {
    return [...rewards].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  searchRewards(query: string): Rewards[] {
    if (!query.trim()) {
      return this.rewards;
    }
    return this.rewards.filter(reward =>
      reward.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getCategories(): string[] {
    const categories = this.rewards.map(reward => reward.category || 'Uncategorized');
    return [...new Set(categories)];
  }
}