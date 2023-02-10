// IMPORTS
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { bggXmlApiClient, getBggSearch, BggSearchResponse} from 'bgg-xml-api-client';


// CLASS
@Injectable({
  providedIn: 'root'
})
export class BggService {

  // VARIABLES
  // private httpHeaders: HttpHeaders;
  // private bgg;

  // CONSTRUCTOR
  // constructor(private httpClient: HttpClient) {
  constructor() {
    GlobalService.devlog('BggService: Constructor()');
    // this.httpHeaders = new HttpHeaders()
    //   .append('Accept', 'text/xml')
    //   .append('Content-Type', 'text/xml')
    //   .append('charset','UTF-8')
    //   .append('Access-Control-Allow-Origin','*');
  }

  // FUNCTIONS
  // search()
  async search(searchQuery: string) {
    GlobalService.devlog('BggService: search()');
    // const xmlBggGames =
    //   await this.httpClient.get(`https://boardgamegeek.com/xmlapi2/search`,{params:{query: searchQuery}}).toPromise() as string;
    // GlobalService.devlog(JSON.stringify(new XMLParser().parse(xmlBggGames) as JSON));
    //return this.httpClient.get(`http://boardgamegeek.com/xmlapi/search?search=dune`, { headers: this.httpHeaders });
    // this.httpClient.get(`https://c75a897d-de45-4b12-bd77-fb6ba47962b9.mock.pstmn.io/llistatJocs`)
    //  .subscribe( x => {});
    //this.httpClient.get(`https://boardgamegeek.com/xmlapi2/search`,{params:{query: searchQuery}, headers: this.httpHeaders})
    // this.httpClient.get('https://www.boardgamegeek.com/xmlapi/geeklist/20005', {headers: this.httpHeaders})
    // .subscribe( x => {});


  // const { data } = await bggXmlApiClient.get('user', { name: 'Qrzy88' });
  // console.log(data.id); // displays: 1381959
  // let res:  [{id: number; name: string; yearPublished: number}];
  console.log(await getBggSearch({query: searchQuery, type: 'boardgame'}));
  const { data } = await getBggSearch({query: searchQuery, type: 'boardgame'});
  return data.item;

  }
}
