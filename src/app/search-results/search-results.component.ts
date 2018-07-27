import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../image-search.service';
import { TranslateService } from '../translate.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  results;
  order;
  ascending;
  orderBy: string;
  filterField: string;
  range: string;
  selectedLanguage: string;
  constructor(private imageSearchService: ImageSearchService, public _DomSanitizationService: DomSanitizer, private translateService: TranslateService) { }

  ngOnInit() {
    this.results = this.imageSearchService.searchResults();
    this.orderBy = 'Oldest';
    this.order = 'unix_time';
    this.ascending = true;
    this.filterField = 'unix_time';
    this.range = 'Any time';
    this.selectedLanguage = 'No language selected';

    this.translateService.getLanguageList().subscribe(res => {
      console.log('languages', res);
      this.translateService.languages = res;
    }, error => {

    });
  }

  changeOrder(order) {
    if (order === 'Oldest') {
      this.ascending = true;
    } else {
      this.ascending = false;
    }

    this.orderBy = order;
  }

  changeFilter(ev) {
    this.range = ev.target.innerText;
  }

  changeLanguage(ev) {
    this.selectedLanguage = ev.target.innerText;
  }
}
