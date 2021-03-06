import { Injectable } from '@angular/core';
import { GameData, GameInfo } from './game-detail';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialUser } from 'angular5-social-login';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  gameList: GameInfo[] = null;
  gameData: GameData = new GameData();
  userList: String[] = [];
  serverURL = 'http://localhost:4201';
  constructor(private http: HttpClient) {

  }

  getGameDetails(userID): GameInfo[] {
   this.gameList = [];
   if (userID === 'kavitha') { return this.gameList; }
   this.gameList.push({
        active: false,
        gameID: 'ID113',
        players: [ 'kavi5712', 'Priya', 'Bank'],
        active_since: new Date('2018-08-10')
    });
    this.gameList.push({
      active: false,
      gameID: 'ID123',
      players: ['kavitha', 'Priya', 'kavi5712', 'Bank'],
      active_since: new Date('2018-03-10')
    });
    this.gameList.push({
      active: false,
      gameID: 'ID143',
      players: ['kavitha', 'Priya', 'kavi5712', 'kavin', 'Bank'],
      active_since: new Date('2018-02-15')
    });
    return this.gameList;
  }

  getBoard(gameID: string): GameData {
    this.gameData.gameInfo = {
      active: false,
      gameID: 'ID123',
      players: ['kavitha', 'Priya', 'kavi5712', 'Bank'],
      active_since: new Date('2018-03-10')
    };
    this.gameData.players = [{
        playerID: 'kavi5712',
        balance: 200
      },
      {
        playerID: 'Priya',
        balance: 250
      },
      {
        playerID: 'Bank',
        balance: 2500
      }
    ];
    this.gameData.banker = 'kavi5712';
    this.gameData.logs = [{
      from: 'Bank',
      to: 'Priya',
      amount: 1500,
      timestamp : new Date('2018-08-09')
    },
    {
      from: 'Bank',
      to: 'kavi5712',
      amount: 1500,
      timestamp : new Date('2018-08-09')
    }];
    return this.gameData;
  }

  checkProfileAvailability(requested_userID: String): Observable<any> {
    const url = `${this.serverURL}/api/profile/availablity?userID=${requested_userID}`;
    return this.http.get(url);
  }

  checkGameAvailability(userID: String, game_name: String): Observable<any> {
    const url = `${this.serverURL}/api/game/availablity?userID=${userID}&name=${game_name}`;
    return this.http.get(url);
  }

  createProfile(userID: String, userData: SocialUser): Observable<any> {
    const url = `${this.serverURL}/api/profile/create?userID=${userID}`;
    return this.http.post(url, userData);
  }

  createGame(gameName: String): Promise<boolean> {
    const response = new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
        // this.userList.push(gameName);
        resolve(true);
        }, 2000);
    });
    return response;
}

  findUserID(userData) {
    const url = `${this.serverURL}/api/profile/find?email=${encodeURIComponent(userData.email)}`;
    return this.http.get(url);
  }
}
