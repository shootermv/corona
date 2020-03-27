import { CoronaHistory } from './../classes/corona-history';
import { CoronaAll } from "../classes/coronaAll";
import { CoronaApiService } from "./../corona-api.service";
import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { Observable } from "rxjs";
import { CoronaAllCountries } from "app/classes/corona-all-countries";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  condition: boolean = true;
  totalInfected: number;
  totalRecovered: number;
  totalDeath: number;
  lastUpdate: Date;

  allCountries: CoronaAllCountries;
  worldHistory: CoronaHistory[]= [];
  InfectedHistory: any;
  DeathHistory: any;

  constructor(public coronaNews: CoronaApiService) {}
  ngOnInit(): void {
    this.getAll();
    this.getAllCountries();
    this.getHistory();
  }

  getAll() {
    this.coronaNews.coronaAll().subscribe((results: CoronaAll) => {

      this.totalInfected = results.cases;
      this.totalRecovered = results.recovered;
      this.totalDeath = results.deaths;
      this.lastUpdate = results.updated;
      
    });
  }

  getAllCountries() {
    this.coronaNews.coronaAllCountries().subscribe(results => {
      this.allCountries = results;
    });
  }

  getHistory() {
    this.coronaNews.coronaHistory().subscribe(res => {

      this.condition = false;
      this.worldHistory = res;
    });
  }
}
